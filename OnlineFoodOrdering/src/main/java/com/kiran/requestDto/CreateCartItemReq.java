package com.kiran.requestDto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CreateCartItemReq {
    private Long foodId;
    private Integer quantity;
    private List<String> ingredients=new ArrayList<>();
}
