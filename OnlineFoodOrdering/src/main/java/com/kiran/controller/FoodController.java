package com.kiran.controller;

import com.kiran.Service.FoodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodServiceImpl foodService;

    @GetMapping("/search")
    public ResponseEntity<?> searchFood(@RequestParam String name){
        return ResponseEntity.status(HttpStatus.OK).body(foodService.searchFood(name));
    }


    @GetMapping("/{restaurantId}")
    public ResponseEntity<?> getRestaurantFood(@PathVariable Long restaurantId
            ,@RequestParam boolean vegetarian,@RequestParam boolean seasonal,
                                               @RequestParam boolean nonVeg,@RequestParam(required = false) String foodCategory){
        return ResponseEntity.status(HttpStatus.OK).body(foodService.getRestaurantsFood(restaurantId,vegetarian,nonVeg,seasonal,foodCategory));
    }

}
