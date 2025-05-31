package com.vendify.orders.config;

import com.vendify.orders.model.Address;
import com.vendify.orders.model.Order;
import com.vendify.orders.model.OrderItem;
import com.vendify.orders.model.OrderStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import reactor.core.publisher.Mono;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class MongoDataConfig implements CommandLineRunner {
    private final ReactiveMongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        var order1 = new Order("6839d4104106e209e93ea39c", 2L, new Address("Main St", "City", "A1", "12345", "0700000000"),
                299.99, List.of(new OrderItem(1L, 2)), OrderStatus.PLACED, LocalDateTime.now());

        var order2 = new Order("6839d4104106e209e93ea39c", 2L, new Address("Main St", "City", "A1", "12345", "0700000000"),
                199.99, List.of(new OrderItem(2L, 1)), OrderStatus.PLACED, LocalDateTime.now());

        var order3 = new Order("6839d4104106e209e93ea39d", 3L, new Address("High St", "Town", "B2", "54321", "0700000001"),
                399.99, List.of(new OrderItem(3L, 3)), OrderStatus.PLACED, LocalDateTime.now());

        var order4 = new Order("6839d4104106e209e93ea39d", 3L, new Address("High St", "Town", "B2", "54321", "0700000001"),
                89.99, List.of(new OrderItem(4L, 1)), OrderStatus.PLACED, LocalDateTime.now());

        var initFlow = mongoTemplate.dropCollection(Order.class)
                .thenMany(mongoTemplate.insertAll(List.of(order1, order2, order3, order4)))
                .then()
                .onErrorResume(e -> {
                    log.error("MongoDB data initialization error: {}", e.getMessage());
                    return Mono.empty();
                });

        initFlow.subscribe();
    }
}
