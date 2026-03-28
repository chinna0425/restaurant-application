package com.kiran.Repository;

import com.kiran.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryJpaRepo extends JpaRepository<Category,Long> {
    public List<Category> findByRestaurantId(Long id);

    Category findByNameAndRestaurantId(String name, Long restaurantId);
}