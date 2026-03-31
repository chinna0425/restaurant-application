package com.kiran.controller;

import com.kiran.Service.EventServiceImpl;
import com.kiran.Service.UserService;
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
@RequestMapping("/admin/event")
public class AdminEventController {
    @Autowired
    private EventServiceImpl eventServiceImpl;
    @Autowired
    private UserService userService;

    // Create Event (Restaurant Owner)
    @PostMapping("/restaurant/{restaurantId}")
    public ResponseEntity<?> createEvent(
            @RequestBody EventRequest request,
            @PathVariable Long restaurantId) {

        return ResponseEntity.status(HttpStatus.CREATED).body(eventServiceImpl.createEvent(request, restaurantId));
    }


    // Delete event
    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long eventId,@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        eventServiceImpl.deleteEvent(eventId,user.getId());
        MessageResponse message=new MessageResponse();
        message.setMessage("Event deleted successfully");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(message);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<?> getEventsByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.status(HttpStatus.OK).body(eventServiceImpl.getEventsByRestaurant(restaurantId));
    }
}
