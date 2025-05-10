package com.vendify.orders.repository;

import com.vendify.orders.model.Order;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface OrderRepository extends ReactiveCrudRepository<Order, String> {
    Flux<Order> findByCustomerId(long customerId);
    Flux<Order> findByStoreId(String storeId);
}
