package com.kiran.Repository;

import com.kiran.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodJpaRepo extends JpaRepository<Food,Long> {
    List<Food> findByRestaurantId(Long restaurantId);

    @Query("SELECT f FROM Food f WHERE f.name LIKE %:key% OR f.foodCategory.name LIKE %:key%")
    List<Food> searchFood(@Param("key") String key);
}
