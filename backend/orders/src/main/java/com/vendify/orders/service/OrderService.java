package com.vendify.orders.service;

import com.vendify.orders.model.*;
import com.vendify.orders.repository.CartRepository;
import com.vendify.orders.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public Flux<Order> getOrders(long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Flux<Order> getOrdersByStore(String storeId) {
        return orderRepository.findByStoreId(storeId);
    }

    public Mono<Order> createOrder(OrderDTO orderDTO) {
        return cartRepository.findByCustomerIdAndStoreId(orderDTO.getCustomerId(), orderDTO.getStoreId())
                .collectList()
                .flatMap(cartItems -> {
                    if (cartItems.isEmpty()) return Mono.error(new RuntimeException("Cart is empty"));

                    var items = cartItems.stream()
                            .map(c -> new OrderItem(c.getProductId(), c.getQuantity()))
                            .toList();

                    var order = new Order(orderDTO.getStoreId(), orderDTO.getCustomerId(), orderDTO.getAddress(), orderDTO.getPrice(), items, OrderStatus.PLACED, LocalDateTime.now());
                    return orderRepository.save(order)
                            .doOnSuccess(o -> cartRepository.deleteAll(cartItems).subscribe());
                });
    }

    public Mono<Order> updateStatus(String orderId, OrderStatus status) {
        return orderRepository.findById(orderId)
                .flatMap(order -> {
                    order.setStatus(status);
                    return orderRepository.save(order);
                });
    }

    public Flux<Long> getTopSellingProductIds(String storeId, int limit) {
        return orderRepository.findTopSellingProductIdsByStore(storeId, limit);
    }

    public Mono<Void> deleteOrder(String orderId) {
        return orderRepository.deleteById(orderId);
    }
}
