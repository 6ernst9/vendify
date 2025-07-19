package com.vendify.orders.service;

import com.vendify.orders.model.*;
import com.vendify.orders.repository.CartRepository;
import com.vendify.orders.repository.OrderRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final WebClient webClient;

    public Mono<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Flux<Order> getOrders(long customerId) {
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public Flux<Order> getOrdersByStore(String storeId) {
        return orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
    }

    public Mono<Void> createOrder(OrderDTO orderDTO) {
        return cartRepository.findByCustomerIdAndStoreId(orderDTO.getCustomerId(), orderDTO.getStoreId())
                .collectList()
                .flatMap(cartItems -> {
                    if (cartItems.isEmpty()) return Mono.error(new RuntimeException("Cart is empty"));

                    var items = cartItems.stream()
                            .map(c -> new OrderItem(c.getProductId(), c.getQuantity()))
                            .toList();

                    var order = new Order(orderDTO.getStoreId(), orderDTO.getCustomerId(), orderDTO.getCoupon(), orderDTO.getAddress(), orderDTO.getPrice(), items, OrderStatus.PLACED, LocalDateTime.now());
                    return orderRepository.save(order)
                            .then(cartRepository.deleteAll(cartItems)
                                    .then(updateStock(items))
                                    .then(applyCoupon(orderDTO.getCoupon(), orderDTO.getStoreId()))
                            );
                });
    }

    public Mono<Order> updateStatus(String orderId, OrderStatus status) {
        return orderRepository.findById(orderId)
                .flatMap(order -> {
                    order.setStatus(status);
                    return orderRepository.save(order);
                });
    }

    public Mono<Order> rateOrder(String orderId, List<RateItem> items) {
        return orderRepository.findById(orderId)
                .flatMap(order -> {
                    order.setRated(true);
                    items.forEach(this::rateProduct);
                    return orderRepository.save(order);
                });
    }

    public Flux<Long> getTopSellingProductIds(String storeId, int limit) {
        return orderRepository.findTopSellingProductIdsByStore(storeId, limit);
    }

    public Mono<Void> deleteOrder(String orderId) {
        return orderRepository.deleteById(orderId);
    }

    private Mono<Void> updateStock(List<OrderItem> items) {
       return webClient.put()
                .uri("/api/products/update-stock")
                .bodyValue(items)
                .retrieve()
                .bodyToMono(String.class).then();
    }

    private Mono<Void> applyCoupon(@Nullable String code, String storeId) {
        if(code == null) {
            return Mono.empty().then();
        }
        return webClient.put()
                .uri("/api/sales/apply-coupon/" + code + "/" + storeId)
                .retrieve()
                .bodyToMono(String.class).then();
    }

    private void rateProduct(RateItem item) {
        webClient.put()
                .uri("/api/products/rate/" + item.productId() + "/" + item.score())
                .retrieve()
                .bodyToMono(String.class).subscribe();
    }
}
