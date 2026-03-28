package com.kiran.controller;

import com.kiran.Service.RestaurantService;
import com.kiran.Service.UserService;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import com.kiran.requestDto.CreateRestaurantReq;
import com.kiran.responseDto.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createRestaurant(@RequestBody CreateRestaurantReq req,@AuthenticationPrincipal UserDetailsImpl userDetails){
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createRestaurant(req,user));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRestaurant(@RequestBody CreateRestaurantReq req,@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable Long id) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.updateRestaurant(id,req));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRestaurant(@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable Long id) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        restaurantService.deleteRestaurant(id);
        MessageResponse message=new MessageResponse();
        message.setMessage("Restaurant deleted successfully");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(message);
    }

    @PutMapping("/update/{id}/status")
    public ResponseEntity<?> updateRestaurantStatus(@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable Long id) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.updateRestaurantStatus(id));
    }

    @GetMapping("/user")
    public ResponseEntity<?> findRestaurantByUserId(@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.getRestaurantByUserId(user.getId()));
    }

}
