package com.kiran.requestDto;

import lombok.Data;

@Data
public class CreateIngredientReq {
    private String name;
    private Long restaurantId;
}
