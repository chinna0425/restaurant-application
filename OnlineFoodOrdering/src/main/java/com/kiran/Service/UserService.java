package com.kiran.Service;

import com.kiran.Repository.AddressJpaRepo;
import com.kiran.entity.Address;
import com.kiran.entity.User;
import com.kiran.exceptions.ResourceNotFoundException;
import com.kiran.Repository.UserJpaRepo;
import com.kiran.responseDto.AddressResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserJpaRepo userJpaRepo;

    @Autowired
    private AddressJpaRepo addressJpaRepo;

    public User getLoggedInUserProfile(Long id) {
        User exisitingUser=userJpaRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        return exisitingUser;
    }

    public User getLoggedUserProfile(Long id) {
        User exisitingUser=userJpaRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        exisitingUser.setPassword(null);
        return exisitingUser;
    }

    public List<User> getAllUsers() {
        List<User> userList=userJpaRepo.findAll();
        return userList;
    }

    public List<AddressResponse> getUserOrderedAddresses(Long id) {
        List<Address> addresses = addressJpaRepo.findByUserId(id);

        // Remove duplicates using Set
        Set<String> unique = new HashSet<>();
        List<AddressResponse> result = new ArrayList<>();

        for (Address addr : addresses) {
            String key = addr.getStreetAddress() + addr.getCity() + addr.getPostalCode();

            if (!unique.contains(key)) {
                unique.add(key);
                AddressResponse resp=new AddressResponse();
                resp.setId(addr.getId());
                resp.setCity(addr.getCity());
                resp.setCountry(addr.getCountry());
                resp.setStreetAddress(addr.getStreetAddress());
                resp.setPostalCode(addr.getPostalCode());
                resp.setStateProvince(addr.getStateProvince());
                result.add(resp);
            }
        }

        return result;
    }


    /*
    private UserCreateResponseDto convertToResponse(User exisitngUser) {
        UserCreateResponseDto responseDto=new UserCreateResponseDto();
        responseDto.setId(exisitngUser.getId());
        responseDto.setFullName(exisitngUser.getFullName());
        responseDto.setRole(exisitngUser.getRole().toString());
        return responseDto;
    } */
}
