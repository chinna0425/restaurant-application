package com.kiran.Service;

import com.kiran.entity.Restaurant;
import com.kiran.entity.User;
import com.kiran.requestDto.CreateRestaurantReq;
import com.kiran.requestDto.RestaurantDto;

import java.util.List;

public interface RestaurantService {
    public Restaurant createRestaurant(CreateRestaurantReq req, User user);

    public Restaurant updateRestaurant(Long restaurantId,CreateRestaurantReq updateRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String key);

    public Restaurant findRestaurantById(Long id) throws Exception;

    public Restaurant getRestaurantByUserId(Long userId) throws Exception;

    public RestaurantDto addToFavourites(Long restaurantId,User user) throws Exception;

    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception;
}
