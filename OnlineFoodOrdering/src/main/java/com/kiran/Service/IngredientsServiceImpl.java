package com.kiran.Service;

import com.kiran.Repository.IngredientCategoryJpaRepo;
import com.kiran.Repository.IngredientItemJpaRepo;
import com.kiran.entity.IngredientCategory;
import com.kiran.entity.IngredientsItem;
import com.kiran.entity.Restaurant;
import com.kiran.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientsServiceImpl implements IngredientsService {

    @Autowired
    private IngredientItemJpaRepo ingredientItemJpaRepo;

    @Autowired
    private IngredientCategoryJpaRepo ingredientCategoryJpaRepo;

    @Autowired
    private RestaurantServiceImpl restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant=restaurantService.findRestaurantById(restaurantId);
        IngredientCategory ingredientCategory=new IngredientCategory();
        ingredientCategory.setRestaurant(restaurant);
        ingredientCategory.setName(name);
        return ingredientCategoryJpaRepo.save(ingredientCategory);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        return ingredientCategoryJpaRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("IngredientCategory not found with id "+id));
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant=restaurantService.findRestaurantById(id);
        return ingredientCategoryJpaRepo.findByRestaurantId(id);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant=restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category=findIngredientCategoryById(categoryId);
        IngredientsItem item=new IngredientsItem();
        item.setRestaurant(restaurant);
        item.setName(ingredientName);
        item.setCategory(category);
        IngredientsItem ingredient=ingredientItemJpaRepo.save(item);
        category.getIngredients().add(ingredient);
        return ingredient;
    }

    @Override
    public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) throws Exception {
        Restaurant restaurant=restaurantService.findRestaurantById(restaurantId);
        return ingredientItemJpaRepo.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        IngredientsItem ingredientsItem=ingredientItemJpaRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Ingredient item not found with id "+id));
        ingredientsItem.setInStoke(!ingredientsItem.isInStoke());
        return ingredientItemJpaRepo.save(ingredientsItem);
    }
}
