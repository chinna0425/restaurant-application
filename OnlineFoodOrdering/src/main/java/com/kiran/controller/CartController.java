package com.kiran.controller;

import com.kiran.Service.CartServiceImpl;
import com.kiran.Service.UserService;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import com.kiran.requestDto.CreateCartItemReq;
import com.kiran.requestDto.UpdateCartItemReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private CartServiceImpl cartService;

    @Autowired
    private UserService userService;

    @PutMapping("/cart/add")
    public ResponseEntity<?> addItemToCart(@RequestBody CreateCartItemReq req,@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(cartService.addItemToCart(req, user.getId()));
    }

    @PutMapping("/cart-item/update")
    public ResponseEntity<?> updateCartItemQuantity(@RequestBody UpdateCartItemReq req) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.updateCartItemQuantity(req.getCartItemId(), req.getQuantity()));
    }

    @DeleteMapping("/cart-item/{id}/remove")
    public ResponseEntity<?> removeCartItem(@PathVariable Long id,@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(cartService.removeItemFromCart(id,user.getId()));
    }

    @DeleteMapping("/cart/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(cartService.clearCart(user.getId()));
    }

    @GetMapping("/cart")
    public ResponseEntity<?> findUserCart(@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception{
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(cartService.findCartByUserId(user.getId()));
    }

}
