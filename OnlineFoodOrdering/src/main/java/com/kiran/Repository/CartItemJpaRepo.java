package com.kiran.Repository;

import com.kiran.entity.Cart;
import com.kiran.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemJpaRepo extends JpaRepository<CartItem,Long> {

}
