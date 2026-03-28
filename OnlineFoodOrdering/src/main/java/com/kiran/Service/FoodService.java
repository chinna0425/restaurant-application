package com.kiran.Service;

import com.kiran.entity.Category;
import com.kiran.entity.Food;
import com.kiran.requestDto.CreateFoodRequest;

import java.util.List;

public interface FoodService {
    public Food createFood(CreateFoodRequest req, Category category);

    public void  deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId,boolean isVegetarian,boolean isNonVeg,boolean isSeasonable,String foodCategory);

    public List<Food> searchFood(String key);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;

}
