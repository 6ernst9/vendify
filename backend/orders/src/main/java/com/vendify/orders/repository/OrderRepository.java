package com.vendify.orders.repository;

import com.vendify.orders.model.Order;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface OrderRepository extends ReactiveCrudRepository<Order, String> {
    Flux<Order> findByCustomerId(long customerId);
    Flux<Order> findByStoreId(String storeId);
    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $unwind: '$items' }",
            "{ $group: { _id: '$items.productId', totalSold: { $sum: '$items.quantity' } } }",
            "{ $sort: { totalSold: -1 } }",
            "{ $limit: ?1 }",
            "{ $project: { _id: 1 } }"
    })
    Flux<Long> findTopSellingProductIdsByStore(String storeId, int limit);

}
