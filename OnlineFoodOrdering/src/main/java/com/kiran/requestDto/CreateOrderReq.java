package com.kiran.requestDto;

import com.kiran.entity.Address;
import lombok.Data;

@Data
public class CreateOrderReq {
    private Long restaurantId;
    private Address deliveryAddress;
}
