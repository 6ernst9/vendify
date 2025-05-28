package com.vendify.orders.controller;

import com.vendify.orders.model.Order;
import com.vendify.orders.model.OrderDTO;
import com.vendify.orders.model.OrderStatus;
import com.vendify.orders.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    @GetMapping("/get-orders-by-store/{storeId}")
    public Flux<Order> getOrdersByStore(@PathVariable String storeId) {
        return orderService.getOrdersByStore(storeId);
    }

    @PostMapping("/create-order")
    public Mono<Order> createOrder(@RequestBody OrderDTO order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/update-order/{orderId}/{status}")
    public Mono<Order> updateStatus(@PathVariable String orderId,
                                    @PathVariable String status) {
        return orderService.updateStatus(orderId, OrderStatus.valueOf(status));
    }

    @DeleteMapping("/delete-order/{orderId}")
    public Mono<Void> deleteOrder(@PathVariable String orderId) {
        return orderService.deleteOrder(orderId);
    }
}
