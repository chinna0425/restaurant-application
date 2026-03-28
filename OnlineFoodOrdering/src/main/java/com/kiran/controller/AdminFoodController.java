package com.kiran.controller;

import com.kiran.Service.FoodServiceImpl;
import com.kiran.Service.UserService;
import com.kiran.requestDto.CreateFoodRequest;
import com.kiran.responseDto.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {
    @Autowired
    private FoodServiceImpl foodService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createFood(@RequestBody CreateFoodRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(foodService.createFood(request,request.getCategory()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) throws Exception {
        foodService.deleteFood(id);
        MessageResponse messageResponse=new MessageResponse();
        messageResponse.setMessage("Deleted Successfully");
        return ResponseEntity.ok(messageResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFoodAvailability(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(foodService.updateAvailabilityStatus(id));
    }


}
