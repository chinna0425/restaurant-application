package com.kiran.Repository;

import com.kiran.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartJpaRepo extends JpaRepository<Cart,Long> {
    public Cart findByCustomerId(Long userId);
}
