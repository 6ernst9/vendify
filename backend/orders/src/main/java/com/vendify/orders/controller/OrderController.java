package com.vendify.orders.controller;

import com.vendify.orders.model.Order;
import com.vendify.orders.model.OrderDTO;
import com.vendify.orders.model.OrderStatus;
import com.vendify.orders.model.RateItem;
import com.vendify.orders.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/get-orders/{customerId}")
    public Flux<Order> getOrders(@PathVariable long customerId) {
        return orderService.getOrders(customerId);
    }

    @GetMapping("/get-order-by-id/{id}")
    public Mono<Order> getOrder(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/get-orders-by-store/{storeId}")
    public Flux<Order> getOrdersByStore(@PathVariable String storeId) {
        return orderService.getOrdersByStore(storeId);
    }

    @GetMapping("/get-best-selling-orders/{storeId}/{limit}")
    public Flux<Long> getOrdersByStore(@PathVariable String storeId,
                                        @PathVariable int limit) {
        return orderService.getTopSellingProductIds(storeId, limit);
    }

    @PostMapping("/create-order")
    public Mono<Void> createOrder(@RequestBody OrderDTO order) {
        return orderService.createOrder(order);
    }

    @PostMapping("/rate-order/{storeId}")
    public Mono<Void> rateOrder(@PathVariable String storeId,
                                @RequestBody List<RateItem> items) {
        return orderService.rateOrder(storeId, items).then(Mono.empty());
    }

    @PutMapping("/update-status/{orderId}/{status}")
    public Mono<Order> updateStatus(@PathVariable String orderId,
                                    @PathVariable String status) {
        return orderService.updateStatus(orderId, OrderStatus.valueOf(status));
    }

    @DeleteMapping("/delete-order/{orderId}")
    public Mono<Void> deleteOrder(@PathVariable String orderId) {
        return orderService.deleteOrder(orderId);
    }
}
