package com.vendify.orders.service;

import com.vendify.orders.model.CartItem;
import com.vendify.orders.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public Flux<CartItem> getCart(long customerId) {
        return cartRepository.findByCustomerId(customerId);
    }

    public Mono<CartItem> addToCart(long customerId, String storeId, long productId, int quantity) {
        return cartRepository.findByCustomerIdAndStoreIdAndProductId(customerId, storeId, productId)
                .flatMap(existing -> {
                    existing.setQuantity(existing.getQuantity() + quantity);
                    return cartRepository.save(existing);
                })
                .switchIfEmpty(cartRepository.save(new CartItem(
                        storeId, customerId, productId, quantity
                )));
    }

    public Mono<CartItem> updateQuantity(long customerId, String storeId, long productId, int quantity) {
        return cartRepository.findByCustomerIdAndStoreIdAndProductId(customerId, storeId, productId)
                .flatMap(existing -> {
                    if(quantity == 0) {
                        return cartRepository.deleteById(existing.getId()).then(Mono.just(existing));
                    } else {
                        existing.setQuantity(quantity);
                        return cartRepository.save(existing);
                    }
                });
    }

    public Mono<Void> removeFromCart(long customerId, String storeId, long productId) {
        return cartRepository.findByCustomerIdAndStoreIdAndProductId(customerId, storeId, productId)
                .flatMap(cartRepository::delete);
    }

    public Mono<Void> clearCart(long customerId) {
        return cartRepository.findByCustomerId(customerId)
                .flatMap(cartRepository::delete)
                .then();
    }

    public Mono<Map<Long, List<CartItem>>> getAllCartsByStoreGroupedByCustomer(String storeId) {
        return cartRepository.findByStoreId(storeId)
                .collectList()
                .map(list -> list.stream()
                        .collect(Collectors.groupingBy(CartItem::getCustomerId)));
    }

}
