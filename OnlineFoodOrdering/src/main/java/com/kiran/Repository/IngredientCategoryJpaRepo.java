package com.kiran.Repository;

import com.kiran.entity.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientCategoryJpaRepo extends JpaRepository<IngredientCategory,Long> {
    List<IngredientCategory> findByRestaurantId(Long restaurantId);
}
