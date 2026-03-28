package com.kiran.Service;

import com.kiran.Repository.CategoryJpaRepo;
import com.kiran.entity.Category;
import com.kiran.entity.Restaurant;
import com.kiran.exceptions.CategoryAlreadyExistsException;
import com.kiran.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryJpaRepo categoryJpaRepo;
    @Autowired
    private RestaurantServiceImpl restaurantService;

    @Override
    public Category createCategory(String name,Long userId) throws Exception {
        Restaurant restaurant=restaurantService.getRestaurantByUserId(userId);
        Category existingCategory =
                categoryJpaRepo.findByNameAndRestaurantId(name, restaurant.getId());

        if (existingCategory != null) {
            throw new CategoryAlreadyExistsException("Category already exists for this restaurant");
        }
        Category category=new Category();
        category.setName(name);
        category.setRestaurant(restaurant);
        restaurant.getCategories().add(category);
        return categoryJpaRepo.save(category);
    }

    @Override
    public List<Category> findCategoriesByRestaurantId(Long id) throws Exception {
        return categoryJpaRepo.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        return categoryJpaRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Category not found with id "+id));
    }
}
