package com.vendify.orders.config;

import com.vendify.orders.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class MongoDataConfig implements CommandLineRunner {
    private final ReactiveMongoTemplate mongoTemplate;
    private final Random random = new Random();

    @Override
    public void run(String... args) {
        List<Order> orders = new ArrayList<>();

        String[] storeIds = {"6839d4104106e209e93ea39c", "6839d4104106e209e93ea39d"};
        long[] customerIds = {1L, 2L, 3L, 4L, 5L};

        for (int i = 0; i < 60; i++) {
            String storeId = storeIds[i % storeIds.length];
            long customerId = customerIds[random.nextInt(customerIds.length)];

            int productId = random.nextInt(10) + 1;
            int quantity = random.nextInt(3) + 1;
            double unitPrice = 20 + random.nextInt(100);
            double price = unitPrice * quantity;

            LocalDateTime localDateTime = LocalDateTime.now().minusDays(random.nextInt(30));
            Instant instant = localDateTime.toInstant(ZoneOffset.UTC);

            Order order = new Order(
                    storeId,
                    customerId,
                    new Address("Street " + i, "City", "Region", "0000", "07000000" + i),
                    price,
                    List.of(new OrderItem((long) productId, quantity)),
                    OrderStatus.PLACED,
                    LocalDateTime.ofInstant(instant, ZoneOffset.UTC)
            );

            orders.add(order);
        }

        var initFlow = mongoTemplate.dropCollection(Order.class)
                .then(mongoTemplate.dropCollection(CartItem.class))
                .then(mongoTemplate.dropCollection(WishlistItem.class))
                .thenMany(mongoTemplate.insertAll(orders))
                .then()
                .onErrorResume(e -> {
                    log.error("MongoDB data initialization error: {}", e.getMessage());
                    return Mono.empty();
                });

        initFlow.subscribe();
    }
}
