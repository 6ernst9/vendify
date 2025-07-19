package com.vendify.orders.service;

import com.vendify.orders.model.Cart;
import com.vendify.orders.model.CartItem;
import com.vendify.orders.model.Wishlist;
import com.vendify.orders.model.WishlistItem;
import com.vendify.orders.repository.CartRepository;
import com.vendify.orders.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final CartRepository cartRepository;

    public Flux<WishlistItem> getWishlist(long customerId) {
        return wishlistRepository.findWishlistItemByCustomerId(customerId);
    }

    public Mono<WishlistItem> addWishlist(Wishlist wishlist) {
        return wishlistRepository.save(
                new WishlistItem(
                        wishlist.getStoreId(),
                        wishlist.getCustomerId(),
                        wishlist.getProductId()
                )
        );
    }

    public Flux<CartItem> promoteWishlist(long id) {
        return wishlistRepository.findByCustomerId(id)
                .flatMap(wishlistItem -> {
                    CartItem cartItem = new CartItem(
                            wishlistItem.getStoreId(),
                            wishlistItem.getCustomerId(),
                            wishlistItem.getProductId(),
                            1
                    );
                    return cartRepository.save(cartItem)
                            .flatMap(saved -> wishlistRepository.deleteById(wishlistItem.getId()).thenReturn(saved));
                });
    }

    public Mono<Map<Long, List<WishlistItem>>> getAllWishlistsByStoreGroupedByCustomer(String storeId) {
        return wishlistRepository.findByStoreId(storeId)
                .collectList()
                .map(list -> list.stream()
                        .collect(Collectors.groupingBy(WishlistItem::getCustomerId)));
    }

    public Mono<Void> removeFromWishlist(String storeId, long productId, long customerId) {
        return wishlistRepository.findByCustomerIdAndProductIdAndStoreId(customerId, productId, storeId).flatMap(wishlistRepository::delete);
    }
}
