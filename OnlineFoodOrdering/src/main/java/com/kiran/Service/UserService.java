package com.kiran.Service;

import com.kiran.entity.User;
import com.kiran.exceptions.ResourceNotFoundException;
import com.kiran.Repository.UserJpaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserJpaRepo userJpaRepo;

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


    /*
    private UserCreateResponseDto convertToResponse(User exisitngUser) {
        UserCreateResponseDto responseDto=new UserCreateResponseDto();
        responseDto.setId(exisitngUser.getId());
        responseDto.setFullName(exisitngUser.getFullName());
        responseDto.setRole(exisitngUser.getRole().toString());
        return responseDto;
    } */
}
