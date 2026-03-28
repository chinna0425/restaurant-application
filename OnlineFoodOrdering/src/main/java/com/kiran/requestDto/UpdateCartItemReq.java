package com.kiran.requestDto;

import lombok.Data;

@Data
public class UpdateCartItemReq {
    private Long cartItemId;
    private Integer quantity;
}
