package com.kiran.controller;

import com.kiran.Service.OrderServiceImpl;
import com.kiran.Service.PaymentService;
import com.kiran.Service.UserService;
import com.kiran.entity.Order;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import com.kiran.requestDto.CreateCartItemReq;
import com.kiran.requestDto.CreateOrderReq;
import com.kiran.responseDto.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;


    @PostMapping("/order/create")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderReq req, @AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        Order order=orderService.createOrder(req, user.getId());
        PaymentResponse res=paymentService.createPaymentLink(order);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/order/user")
    public ResponseEntity<?> getOrderHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getUserOrders(user.getId()));
    }

}
