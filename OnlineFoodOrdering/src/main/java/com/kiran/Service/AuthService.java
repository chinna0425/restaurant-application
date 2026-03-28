package com.kiran.Service;

import com.kiran.requestDto.AuthRequest;
import com.kiran.responseDto.AuthResponse;
import com.kiran.requestDto.UserCreateReqDto;
import com.kiran.responseDto.UserCreateResponseDto;
import com.kiran.entity.Cart;
import com.kiran.entity.USER_ROLE;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import com.kiran.exceptions.InvalidCredentialsException;
import com.kiran.exceptions.UserAlreadyExistsException;
import com.kiran.Repository.CartJpaRepo;
import com.kiran.Repository.UserJpaRepo;
import org.apache.commons.text.WordUtils;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserJpaRepo userJpaRepo;

    @Autowired
    private CartJpaRepo cartJpaRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserCreateResponseDto createUser(UserCreateReqDto reqDto) throws BadRequestException {
        if (userJpaRepo.findByEmail(reqDto.getEmail().trim().toLowerCase()).isPresent()) {
            throw new UserAlreadyExistsException(
                    "User already exists with email: " + reqDto.getEmail().trim().toLowerCase()
            );
        }
        User newUser=new User();
        newUser.setEmail(reqDto.getEmail().trim().toLowerCase());
        newUser.setFullName(WordUtils.capitalizeFully(reqDto.getFullName().trim()));
        newUser.setPassword(passwordEncoder.encode(reqDto.getPassword().trim()));

        USER_ROLE role = USER_ROLE.ROLE_CUSTOMER; // default

        if (reqDto.getRole() != null) {
            try {
                role = USER_ROLE.valueOf(reqDto.getRole().toUpperCase());
            } catch (IllegalArgumentException ex) {
                throw new BadRequestException("Invalid role: " + reqDto.getRole());
            }
        }
        // Preventing admin creation from public API
        if (role == USER_ROLE.ROLE_ADMIN) {
            throw new BadRequestException("Admin role cannot be assigned");
        }
        newUser.setRole(role);
        User savedUser = userJpaRepo.save(newUser);

        // CREATE CART ONLY FOR CUSTOMER
        if (savedUser.getRole() == USER_ROLE.ROLE_CUSTOMER) {
            Cart cart = new Cart();
            cart.setCustomer(savedUser);
            cartJpaRepo.save(cart);
        }
        return convertToResponse(savedUser);
    }

    private UserCreateResponseDto convertToResponse(User savedUser) {
        UserCreateResponseDto responseDto=new UserCreateResponseDto();
        responseDto.setFullName(savedUser.getFullName());
        responseDto.setRole(savedUser.getRole().toString());
        responseDto.setId(savedUser.getId());
        return responseDto;
    }

    public AuthResponse login(AuthRequest request) throws InvalidCredentialsException {
        User userEntity=userJpaRepo.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(()->new InvalidCredentialsException("Invalid Credentials"));
        if (!passwordEncoder.matches(request.getPassword(), userEntity.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        UserDetailsImpl userDetails = new UserDetailsImpl(userEntity);
        String token=jwtService.generateToken(userDetails);
        AuthResponse response=new AuthResponse();
        response.setToken(token);
        response.setRole(userEntity.getRole().name());
        response.setId(userEntity.getId());
        return response;
    }
}
