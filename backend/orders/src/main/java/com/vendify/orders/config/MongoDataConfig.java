package com.vendify.orders.config;

import com.vendify.orders.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
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
        var orders = new ArrayList<Order>();

        String[] storeIds = {"6839d4104106e209e93ea39c", "6839d4104106e209e93ea39d"};
        long customerId;

        for (int i = 0; i < 60; i++) {
            var storeId = storeIds[i % storeIds.length];

            int productId;
            if (storeId.equals("6839d4104106e209e93ea39c")) {
                productId = 1 + random.nextInt(9);
                customerId = 2L;
            } else {
                productId = 10 + random.nextInt(9);
                customerId = 3L;
            }
            var quantity = random.nextInt(3) + 1;
            var unitPrice = 20 + random.nextInt(100);
            var price = unitPrice * quantity;

            var localDateTime = LocalDateTime.now().minusDays(random.nextInt(30));
            var instant = localDateTime.toInstant(ZoneOffset.UTC);

            var order = new Order(
                    storeId,
                    customerId,
                    null,
                    new Address("Street " + i, "City", "01", "07000000" + i, "00000"),
                    price,
                    List.of(new OrderItem(productId, quantity)),
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
