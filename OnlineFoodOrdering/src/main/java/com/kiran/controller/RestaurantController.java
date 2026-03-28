package com.kiran.controller;

import com.kiran.Service.FoodServiceImpl;
import com.kiran.Service.RestaurantService;
import com.kiran.Service.UserService;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodServiceImpl foodService;


    @GetMapping("/search")
    public ResponseEntity<?> searchRestaurant(@AuthenticationPrincipal UserDetailsImpl userDetails,@RequestParam String key){
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.searchRestaurant(key));
    }

    @GetMapping("/all-restaurants")
    public ResponseEntity<?> getAllRestaurants(@AuthenticationPrincipal UserDetailsImpl userDetails){
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findRestaurantById(@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable Long id) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.findRestaurantById(id));
    }

    @PutMapping("/{id}/add-favourites")
    public ResponseEntity<?> addToFavourites(@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable Long id) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.addToFavourites(id,user));
    }


}
