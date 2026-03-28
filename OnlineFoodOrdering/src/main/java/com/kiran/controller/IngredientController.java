package com.kiran.controller;

import com.kiran.Service.IngredientsServiceImpl;
import com.kiran.requestDto.CreateIngredientItemReq;
import com.kiran.requestDto.CreateIngredientReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

    @Autowired
    private IngredientsServiceImpl ingredientsService;

    @PostMapping("/create-category")
    public ResponseEntity<?> createIngredientCategory(@RequestBody CreateIngredientReq req) throws Exception {
        System.out.println(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(ingredientsService.createIngredientCategory(req.getName(), req.getRestaurantId()));
    }

    @PostMapping("/create-ingredient-item")
    public ResponseEntity<?> createIngredientItem(@RequestBody CreateIngredientItemReq req) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(ingredientsService.createIngredientItem(req.getRestaurantId(),req.getName(),req.getCategoryId()));
    }

    @PutMapping("/{id}/update-stock")
    public ResponseEntity<?> updateIngredientStock(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientsService.updateStock(id));
    }

    @GetMapping("/restaurant/{id}/ingredients")
    public ResponseEntity<?> getRestaurantIngredients(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientsService.findRestaurantsIngredients(id));
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<?> getRestaurantIngredientsCategory(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientsService.findIngredientCategoryByRestaurantId(id));
    }

}
