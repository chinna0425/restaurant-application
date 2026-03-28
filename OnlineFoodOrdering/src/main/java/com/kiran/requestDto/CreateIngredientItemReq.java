package com.kiran.requestDto;

import lombok.Data;

@Data
public class CreateIngredientItemReq {
    private String name;
    private Long categoryId;
    private Long restaurantId;
}
