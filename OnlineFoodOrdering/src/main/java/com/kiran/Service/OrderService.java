package com.kiran.Service;

import com.kiran.entity.Order;
import com.kiran.entity.User;
import com.kiran.requestDto.CreateOrderReq;

import java.util.List;

public interface OrderService {
    public Order createOrder(CreateOrderReq req, Long userId) throws Exception;

    public Order updateOrder(Long orderId,String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUserOrders(Long userId) throws Exception;

    public List<Order> getRestaurantOrders(Long restaurantId,String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;
}
