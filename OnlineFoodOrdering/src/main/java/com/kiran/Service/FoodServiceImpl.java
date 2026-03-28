package com.kiran.Service;

import com.kiran.Repository.CategoryJpaRepo;
import com.kiran.Repository.FoodJpaRepo;
import com.kiran.Repository.RestaurantJpaRepo;
import com.kiran.entity.Category;
import com.kiran.entity.Food;
import com.kiran.entity.Restaurant;
import com.kiran.exceptions.ResourceNotFoundException;
import com.kiran.requestDto.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private FoodJpaRepo foodJpaRepo;

    @Autowired
    private RestaurantJpaRepo restaurantJpaRepo;

    @Autowired
    private CategoryJpaRepo categoryJpaRepo;


    @Override
    public Food createFood(CreateFoodRequest req, Category category) {
        Restaurant restaurant=restaurantJpaRepo.findById(req.getRestaurantId()).orElseThrow(()->new ResourceNotFoundException("Restaurant not found with id "+req.getRestaurantId()));
        Food food=new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonable(req.isSeasonable());
        food.setVegetarian(req.isVegetarian());
        food.setCreationDate(new Date());
        Food savedFood=foodJpaRepo.save(food);
        restaurant.getFoods().add(savedFood);
        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = findFoodById(foodId);

        Restaurant restaurant = food.getRestaurant();

        if (restaurant != null) {
            restaurant.getFoods().remove(food);
        }
        foodJpaRepo.delete(food);
    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonVeg, boolean isSeasonable, String foodCategory) {
        List<Food> foods=foodJpaRepo.findByRestaurantId(restaurantId);

        if(isVegetarian){
            foods=filterByVegetarian(foods,isVegetarian);
        }
        if(isNonVeg){
            foods=filterByNonVeg(foods,isNonVeg);
        }
        if(isSeasonable){
            foods=filterBySeasonable(foods,isSeasonable);
        }


        if(foodCategory!=null && !foodCategory.isBlank()){
            foods=filterByFoodCategory(foods,foodCategory);
        }

        return foods;
    }

    private List<Food> filterByFoodCategory(List<Food> foods,String foodCategory) {
        return foods.stream().filter(food -> {
           if(food.getFoodCategory()!=null){
               return food.getFoodCategory().getName().equals(foodCategory);
           }
           return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterByNonVeg(List<Food> foods, boolean isNonVeg) {
        return foods.stream().filter(food-> !food.isVegetarian()).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonable(List<Food> foods, boolean isSeasonable) {
        return foods.stream().filter(food-> food.isSeasonable()==isSeasonable).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods,boolean isVegetarian) {
        return foods.stream().filter(food->food.isVegetarian()==isVegetarian).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String key) {
        return foodJpaRepo.searchFood(key);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
       return foodJpaRepo.findById(foodId).orElseThrow(()->new ResourceNotFoundException("Food not found with id "+foodId));
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {
        Food food=foodJpaRepo.findById(foodId).orElseThrow(()->new ResourceNotFoundException("Food not found with id "+foodId));
        food.setAvailable(!food.isAvailable());
        return foodJpaRepo.save(food);
    }
}
