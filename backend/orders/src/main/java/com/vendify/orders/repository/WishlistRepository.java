package com.vendify.orders.repository;

import com.vendify.orders.model.WishlistItem;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface WishlistRepository extends ReactiveCrudRepository<WishlistItem, String> {
    Flux<WishlistItem> findWishlistItemByCustomerId(long customerId);
    Mono<WishlistItem> findByCustomerIdAndProductIdAndStoreId(long productId, long customerId, String storeId);
    Flux<WishlistItem> findByStoreId(String storeId);
    Flux<WishlistItem> findByCustomerId(long customerId);
}
