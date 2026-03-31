package com.kiran.Repository;

import com.kiran.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressJpaRepo extends JpaRepository<Address,Long> {
    List<Address> findByUserId(Long userId);
}
