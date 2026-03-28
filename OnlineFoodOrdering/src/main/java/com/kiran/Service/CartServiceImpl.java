package com.kiran.Service;

import com.kiran.Repository.CartItemJpaRepo;
import com.kiran.Repository.CartJpaRepo;
import com.kiran.entity.Cart;
import com.kiran.entity.CartItem;
import com.kiran.entity.Food;
import com.kiran.entity.User;
import com.kiran.exceptions.ResourceNotFoundException;
import com.kiran.requestDto.CreateCartItemReq;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartJpaRepo cartJpaRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemJpaRepo cartItemJpaRepo;

    @Autowired
    private FoodServiceImpl foodService;


    @Override
    @Transactional
    public CartItem addItemToCart(CreateCartItemReq req, Long userId) throws Exception {

        User user = userService.getLoggedInUserProfile(userId);

        Food food = foodService.findFoodById(req.getFoodId());

        Cart cart = cartJpaRepo.findByCustomerId(user.getId());

        if(cart == null){
            cart = new Cart();
            cart.setCustomer(user);
            cart = cartJpaRepo.save(cart);
        }

        // Check if item already exists
        for(CartItem cartItem : cart.getItems()){

            if(cartItem.getFood().getId().equals(food.getId())){

                Integer newQuantity = cartItem.getQuantity() + req.getQuantity();

                cartItem.setQuantity(newQuantity);

                cartItem.setTotalPrice((double)(newQuantity * food.getPrice()));

                return cartItemJpaRepo.save(cartItem);
            }
        }

        // Create new cart item
        CartItem newCartItem = new CartItem();

        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());

        newCartItem.setTotalPrice((double)(req.getQuantity() * food.getPrice()));

        CartItem saved = cartItemJpaRepo.save(newCartItem);

        cart.getItems().add(saved);

        return saved;
    }


    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) throws Exception {
        CartItem cartItem=cartItemJpaRepo.findById(cartItemId).orElseThrow(()-> new ResourceNotFoundException("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice((double)(cartItem.getFood().getPrice()*quantity));

        return cartItemJpaRepo.save(cartItem);
    }

    @Transactional
    @Override
    public Cart removeItemFromCart(Long cartItemId, Long userId) throws Exception {

        Cart cart = cartJpaRepo.findByCustomerId(userId);

        if(cart == null){
            throw new ResourceNotFoundException("Cart not found");
        }

        CartItem cartItem = cartItemJpaRepo.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if(!cartItem.getCart().getId().equals(cart.getId())){
            throw new Exception("Unauthorized");
        }

        cart.getItems().remove(cartItem);

        double total = cart.getItems()
                .stream()
                .mapToDouble(CartItem::getTotalPrice)
                .sum();

        cart.setTotal(total);

        return cart;
    }


    @Override
    public Double calculateCartTotals(Cart cart) throws Exception {
        double total=0.0;
        if (cart.getItems() == null) return total;
        for(CartItem cartItem:cart.getItems()){
            total+=cartItem.getFood().getPrice() * cartItem.getQuantity();
        }
        return (Double) total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        return cartJpaRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Cart not found"));
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        User user = userService.getLoggedInUserProfile(userId);

        Cart cart = cartJpaRepo.findByCustomerId(userId);

        // create cart if null
        if (cart == null) {
            cart = new Cart();
            cart.setCustomer(user);
            cart.setTotal(0.0);
            cart = cartJpaRepo.save(cart);
        }

        if (cart.getItems() != null && !cart.getItems().isEmpty()) {
            cart.setTotal((double) calculateCartTotals(cart));
        }
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart=findCartByUserId(userId);
        cart.getItems().clear();
        return cartJpaRepo.save(cart);
    }
}
