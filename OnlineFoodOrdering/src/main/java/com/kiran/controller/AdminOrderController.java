package com.kiran.controller;

import com.kiran.Service.OrderServiceImpl;
import com.kiran.Service.UserService;
import com.kiran.entity.User;
import com.kiran.entity.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {
    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<?> getOrderHistory(@PathVariable Long id,
                                             @RequestParam(required = false) String orderStatus ,@AuthenticationPrincipal UserDetailsImpl userDetails) throws Exception {
        User user=userService.getLoggedInUserProfile(userDetails.getId());
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getRestaurantOrders(id,orderStatus));
    }

    @PutMapping("/order/{orderId}/{orderStatus}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId,@PathVariable String orderStatus) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.updateOrder(orderId,orderStatus));
    }
}
