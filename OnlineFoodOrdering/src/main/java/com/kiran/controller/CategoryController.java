package com.kiran.controller;

import com.kiran.Service.CategoryServiceImpl;
import com.kiran.Service.UserService;
import com.kiran.entity.Category;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/admin/category/create")
    public ResponseEntity<?> createCategory(@RequestBody Category category,@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(category.getName(),user.getId()));
    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<?> getAllRestaurantCategory(@PathVariable Long id,@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.findCategoriesByRestaurantId(id));
    }


}
