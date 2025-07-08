package com.vendify.orders.controller;

import com.vendify.orders.model.Cart;
import com.vendify.orders.model.CartItem;
import com.vendify.orders.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/get-cart/{customerId}")
    public Flux<CartItem> getCart(@PathVariable long customerId) {
        log.info("Performing GET /get-cart call. Input: customerId={}", customerId);
        return cartService.getCart(customerId)
                .collectList()
                .doOnNext(list ->  log.info("Performed GET /get-cart call. Input: customerId={}, Output: orders={}", customerId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-carts-by-store/{storeId}")
    public Mono<Map<Long, List<CartItem>>> getCartsByStoreForAdmin(@PathVariable String storeId) {
        log.info("Performing GET /get-carts-by-store call. Input: storeId={}", storeId);
        return cartService.getAllCartsByStoreGroupedByCustomer(storeId)
                .flatMap(carts -> {
                    log.info("Performed GET /get-cart call. Input: storeId={}, Output: cartItems={}", storeId, carts);
                    return Mono.just(carts);
                });
    }

    @PostMapping("/add-to-cart")
    public Mono<String> addToCart(@RequestBody Cart cart) {
        log.info("Performing POST /add-to-cart. Input: cart={}", cart);
        var cartItem = cartService.addToCart(cart.getCustomerId(), cart.getStoreId(), cart.getProductId(), cart.getQuantity());
        log.info("Performed POST /add-to-cart. Input: cart={}.", cart);
        return cartItem.then(Mono.just("Cart item added successfully"));
    }

    @PutMapping("/update-cart")
    public Mono<String> updateQuantity(@RequestBody Cart cart) {
        log.info("Performing PUT /update-cart. Input: cart={}", cart);
        var cartItem = cartService.updateQuantity(cart.getCustomerId(), cart.getStoreId(), cart.getProductId(), cart.getQuantity());
        log.info("Performed PUT /update-cart. Input: cart={}.", cart);
        return cartItem.then(Mono.just("Cart item updated successfully"));
    }

    @DeleteMapping("/remove-from-cart/{customerId}/{storeId}/{productId}")
    public Mono<String> removeFromCart(@PathVariable long customerId,
                                     @PathVariable String storeId,
                                     @PathVariable long productId) {
        log.info("Performing DELETE /remove-from-cart. Input: customerId={}, storeId={}, productId={}.", customerId, storeId, productId);
        var res = cartService.removeFromCart(customerId, storeId, productId);
        log.info("Performed DELETE /remove-from-cart. Input: customerId={}, storeId={}, productId={}.", customerId, storeId, productId);
        return res.then(Mono.just("Cart item removed successfully"));
    }

    @DeleteMapping("/clear-cart/{customerId}")
    public Mono<String> clearCart(@PathVariable long customerId) {
        log.info("Performing DELETE /clear-cart. Input: customerId={}", customerId);
        var res = cartService.clearCart(customerId);
        log.info("Performed DELETE /clear-cart. Input: customerId={}", customerId);
        return res.then(Mono.just("Cart items cleared successfully"));
    }
}
