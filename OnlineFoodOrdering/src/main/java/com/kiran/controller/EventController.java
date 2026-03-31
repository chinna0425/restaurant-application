package com.kiran.controller;

import com.kiran.Service.EventService;
import com.kiran.Service.EventServiceImpl;
import com.kiran.Service.UserService;
import com.kiran.entity.Event;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import com.kiran.requestDto.EventRequest;
import com.kiran.responseDto.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventServiceImpl eventServiceImpl;
    @Autowired
    private UserService userService;

    // Get all events (Public)
    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(eventServiceImpl.getAllEvents());
    }


}
