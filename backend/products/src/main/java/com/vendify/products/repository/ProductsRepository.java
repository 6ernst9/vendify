package com.vendify.products.repository;

import com.vendify.products.model.Product;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProductsRepository extends ReactiveCrudRepository<Product, Long> {
    @Query("SELECT * FROM products WHERE store = :store")
    Flux<Product> findProductsByStore(String store);

    @Query("UPDATE products SET old_price = price, price = price * (1 - :percentage) WHERE id = ANY(:productIds)")
    Mono<Void> applyDiscountToProducts(double percentage, List<Long> productIds);

    @Query("SELECT * FROM products WHERE store = :storeId AND old_price > price")
    Flux<Product> findDiscountedProductsByStore(String storeId);

    @Query("SELECT * FROM products WHERE store = :storeId ORDER BY id DESC LIMIT 6")
    Flux<Product> findNewestProductsByStore(String storeId);

    @Query("SELECT * FROM products WHERE store = :store AND category = :category")
    Flux<Product> findProductsByStoreAndCategory(String store, String category);

    @Query("""
        SELECT * FROM products
        WHERE store = :store
        AND category = :category
        AND id <> :productId
        LIMIT 6
    """)
    Flux<Product> findRelatedProducts(String store, String category, long productId);
}
