package com.kiran.Repository;

import com.kiran.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemJpaRepo extends JpaRepository<OrderItem,Long> {

}
