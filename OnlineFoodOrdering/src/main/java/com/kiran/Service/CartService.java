package com.kiran.Service;

import com.kiran.entity.Cart;
import com.kiran.entity.CartItem;
import com.kiran.requestDto.CreateCartItemReq;

public interface CartService {

    public CartItem addItemToCart(CreateCartItemReq req, Long userId) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId,Integer quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId,Long userId) throws Exception;

    public Double calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;
}
