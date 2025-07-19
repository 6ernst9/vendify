package com.vendify.orders.repository;

import com.vendify.orders.model.CartItem;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CartRepository extends ReactiveCrudRepository<CartItem, String> {
    Flux<CartItem> findByCustomerIdAndStoreId(long customerId, String storeId);
    Flux<CartItem> findByCustomerId(long customerId);
    Flux<CartItem> findByStoreId(String storeId);
    Mono<CartItem> findByCustomerIdAndStoreIdAndProductId(long customerId, String storeId, long productId);
}
