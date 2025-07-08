package com.vendify.orders.controller;

import com.vendify.orders.model.Wishlist;
import com.vendify.orders.model.WishlistItem;
import com.vendify.orders.service.WishlistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping("/get-wishlist/{customerId}")
    public Flux<WishlistItem> getWishlist(@PathVariable long customerId) {
        log.info("Performing GET /get-wishlist call. Input: customerId={}", customerId);
        return wishlistService.getWishlist(customerId)
                .collectList()
                .doOnNext(list ->  log.info("Performed GET /get-wishlist call. Input: customerId={}, Output: wishlist={}", customerId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-wishlist-by-store/{storeId}")
    public Mono<Map<Long, List<WishlistItem>>> getWishlistByStoreForAdmin(@PathVariable String storeId) {
        log.info("Performing GET /get-wishlist-by-store call. Input: storeId={}", storeId);
        return wishlistService.getAllWishlistsByStoreGroupedByCustomer(storeId)
                .flatMap(wishlistItems -> {
                    log.info("Performed GET /get-wishlist-by-store call. Input: storeId={}, Output: wishlistItems={}", storeId, wishlistItems);
                    return Mono.just(wishlistItems);
                });
    }

    @PostMapping("/add-to-wishlist")
    public Mono<String> addToWishlist(@RequestBody Wishlist wishlist) {
        log.info("Performing POST /add-to-wishlist. Input: wishlist={}", wishlist);
        var wishlistItem = wishlistService.addWishlist(wishlist);
        log.info("Performed POST /add-to-wishlist. Input: wishlist={}.", wishlist);
        return wishlistItem.then(Mono.just("Wishlist item added successfully"));
    }

    @PostMapping("/promote-wishlist/{id}")
    public Mono<String> promoteWishlist(@PathVariable long id) {
        log.info("Performing POST /promote-wishlist. Input: wishlist={}", id);
        var wishlistItem = wishlistService.promoteWishlist(id);
        log.info("Performed POST /promote-wishlist. Input: wishlist={}.", id);
        return wishlistItem.then(Mono.just("Wishlist item promoted successfully"));
    }

    @DeleteMapping("/remove-from-wishlist/{customerId}/{storeId}/{productId}")
    public Mono<String> removeFromWishlist(@PathVariable long customerId,
                                           @PathVariable String storeId,
                                           @PathVariable long productId) {
        log.info("Performing DELETE /remove-from-wishlist. Input: customerId={}, storeId={}, productId={}.", customerId, storeId, productId);
        var res = wishlistService.removeFromWishlist(storeId, productId, customerId);
        log.info("Performed DELETE /remove-from-wishlist. Input:Input: customerId={}, storeId={}, productId={}.", customerId, storeId, productId);
        return res.then(Mono.just("Wishlist item removed successfully"));
    }
}
