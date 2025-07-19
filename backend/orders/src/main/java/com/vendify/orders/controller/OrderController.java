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
        log.info("Performing GET /get-orders call. Input: customerId={}", customerId);
        return orderService.getOrders(customerId)
                .collectList()
                .doOnNext(list ->  log.info("Performed GET /get-orders call. Input: customerId={}, Output: orders={}", customerId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-order-by-id/{id}")
    public Mono<Order> getOrder(@PathVariable String id) {
        log.info("Performing GET /get-order-by-id call. Input: id={}", id);
        return orderService.getOrderById(id)
                .flatMap(order -> {
                    log.info("Performed GET /get-order-by-id call. Input: id={}. Output: order={}", id, order);
                    return Mono.just(order);
                });
    }

    @GetMapping("/get-orders-by-store/{storeId}")
    public Flux<Order> getOrdersByStore(@PathVariable String storeId) {
        log.info("Performing GET /get-orders-by-store call. Input: storeId={}", storeId);
        return orderService.getOrdersByStore(storeId)
                .collectList()
                .doOnNext(list ->  log.info("Performed GET /get-orders-by-store call. Input: storeId={}, Output: orders={}", storeId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-best-selling-orders/{storeId}/{limit}")
    public Flux<Long> getOrdersByStore(@PathVariable String storeId,
                                        @PathVariable int limit) {
        log.info("Performing GET /get-best-selling-orders call. Input: storeId={}", storeId);
        return orderService.getTopSellingProductIds(storeId, limit)
                .collectList()
                .doOnNext(list ->  log.info("Performed GET get-best-selling-orders call. Input: storeId={}, Output: products={}", storeId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @PostMapping("/create-order")
    public Mono<Void> createOrder(@RequestBody OrderDTO order) {
        log.info("Performing POST /create-order call. Input: order={}", order);
        var res = orderService.createOrder(order);
        log.info("Performed POST /create-order call. Input: order={}", order);
        return res.then(Mono.empty());
    }

    @PostMapping("/rate-order/{storeId}")
    public Mono<Void> rateOrder(@PathVariable String storeId,
                                @RequestBody List<RateItem> items) {
        return orderService.rateOrder(storeId, items).then(Mono.empty());
    }

    @PutMapping("/update-status/{orderId}/{status}")
    public Mono<String> updateStatus(@PathVariable String orderId,
                                    @PathVariable String status) {
        log.info("Performing UPDATE /update-status call. Input: id={}, status={}", orderId, status);
        var res = orderService.updateStatus(orderId, OrderStatus.valueOf(status));
        log.info("Performed UPDATE /update-status call. Input: id={}, status={}", orderId, status);
        return res.then(Mono.just("Status updated successfully"));
    }

    @DeleteMapping("/delete-order/{orderId}")
    public Mono<Void> deleteOrder(@PathVariable String orderId) {
        log.info("Performing DELETE /delete-order call. Input: id={}", orderId);
        var res = orderService.deleteOrder(orderId);
        log.info("Performed DELETE /delete-order call. Input: id={}", orderId);
        return res.then(Mono.empty());
    }
}
