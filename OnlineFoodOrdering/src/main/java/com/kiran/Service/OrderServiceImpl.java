package com.kiran.Service;

import com.kiran.Repository.*;
import com.kiran.entity.*;
import com.kiran.exceptions.ResourceNotFoundException;
import com.kiran.requestDto.CreateOrderReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderJpaRepo orderJpaRepo;

    @Autowired
    private OrderItemJpaRepo orderItemJpaRepo;

    @Autowired
    private AddressJpaRepo addressJpaRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private UserJpaRepo userJpaRepo;

    @Autowired
    private RestaurantJpaRepo restaurantJpaRepo;

    @Autowired
    private RestaurantServiceImpl restaurantService;

    @Autowired
    private CartServiceImpl cartService;


    @Override
    public Order createOrder(CreateOrderReq req, Long userId) throws Exception {
        User user=userService.getLoggedInUserProfile(userId);
        Address shippingAddress=req.getDeliveryAddress();
        shippingAddress.setUser(user);

        Address savedAddress=addressJpaRepo.save(shippingAddress);

        if(!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userJpaRepo.save(user);
        }
        Restaurant restaurant=restaurantService.findRestaurantById(req.getRestaurantId());

        Order newOrder=new Order();
        newOrder.setCustomer(user);
        newOrder.setCreatedAt(new Date());
        newOrder.setOrderStatus("PENDING");
        newOrder.setDeliveryAddress(savedAddress);
        newOrder.setRestaurant(restaurant);

        Cart cart=cartService.findCartByUserId(userId);
        List<OrderItem> orderItems=new ArrayList<>();

        for(CartItem cartItem:cart.getItems()){
            OrderItem orderItem=new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice((double)(cartItem.getTotalPrice()));
            OrderItem savedItem=orderItemJpaRepo.save(orderItem);
            orderItems.add(savedItem);
        }

        newOrder.setItems(orderItems);
        newOrder.setTotalPrice(cart.getTotal());
        Order savedOrder=orderJpaRepo.save(newOrder);
        restaurant.getOrders().add(savedOrder);

        return savedOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order=findOrderById(orderId);
        if(orderStatus.equals("OUT_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING"))
        {
            order.setOrderStatus(orderStatus);
            return orderJpaRepo.save(order);
        }
        throw new Exception("Please Select a valid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Order order=findOrderById(orderId);
        orderJpaRepo.delete(order);
    }

    @Override
    public List<Order> getUserOrders(Long userId) throws Exception {

        return orderJpaRepo.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception {
        List<Order> orders=orderJpaRepo.findByRestaurantId(restaurantId);
        if(orderStatus!=null){
            orders=orders.stream().filter((order)->order.getOrderStatus().equals(orderStatus)).toList();
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        return orderJpaRepo.findById(orderId).orElseThrow(()->new ResourceNotFoundException("Order not found"));
    }
}
