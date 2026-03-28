package com.kiran.Service;

import com.kiran.Repository.AddressJpaRepo;
import com.kiran.Repository.UserJpaRepo;
import com.kiran.entity.Address;
import com.kiran.entity.Restaurant;
import com.kiran.entity.User;
import com.kiran.exceptions.ResourceNotFoundException;
import com.kiran.requestDto.CreateRestaurantReq;
import com.kiran.requestDto.RestaurantDto;
import com.kiran.Repository.RestaurantJpaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantJpaRepo restaurantJpaRepo;

    @Autowired
    private AddressJpaRepo addressJpaRepo;

    @Autowired
    private UserJpaRepo userJpaRepo;

    @Override
    public Restaurant createRestaurant(CreateRestaurantReq req, User user) {
        Address address=addressJpaRepo.save(req.getAddress());
        Restaurant restaurant=new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);
        return restaurantJpaRepo.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantReq updateRestaurant) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);
        String cuisine = updateRestaurant.getCuisineType();
        if (cuisine != null && !cuisine.isBlank()) {
            restaurant.setCuisineType(cuisine.trim());
        }

        String description = updateRestaurant.getDescription();
        if (description != null && !description.isBlank()) {
            restaurant.setDescription(description.trim());
        }

        String name=updateRestaurant.getName();
        if(name!=null && !name.isBlank()){
            restaurant.setName(name.trim());
        }
        return restaurantJpaRepo.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);
        restaurantJpaRepo.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantJpaRepo.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String key) {
        return restaurantJpaRepo.findBySearchQuery(key);
    }

    @Override
    public Restaurant findRestaurantById(Long restaurantId) throws Exception {
        return restaurantJpaRepo.findById(restaurantId).
                orElseThrow(()->new ResourceNotFoundException("Restaurant not found with id : "+restaurantId));
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant=restaurantJpaRepo.findByOwnerId(userId);
        if(restaurant==null){
            throw new ResourceNotFoundException("Restaurant not found with owner id : "+userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);
        RestaurantDto dto=new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurant.getId());

        if(user.getFavourites().contains(dto)){
            user.getFavourites().remove(dto);
        }else{
            user.getFavourites().add(dto);
        }
        userJpaRepo.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantJpaRepo.save(restaurant);
    }
}
