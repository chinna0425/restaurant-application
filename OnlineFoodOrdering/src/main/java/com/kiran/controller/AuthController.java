package com.kiran.controller;

import com.kiran.Service.AuthService;
import com.kiran.requestDto.AuthRequest;
import com.kiran.requestDto.UserCreateReqDto;
import com.kiran.exceptions.InvalidCredentialsException;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody UserCreateReqDto user) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.createUser(user));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) throws InvalidCredentialsException {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(request));
    }

}
