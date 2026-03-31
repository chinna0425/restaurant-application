package com.kiran.Repository;

import com.kiran.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventJpaRepo extends JpaRepository<Event, Long> {

    List<Event> findByRestaurantId(Long restaurantId);
}
