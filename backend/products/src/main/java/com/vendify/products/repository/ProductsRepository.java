package com.vendify.products.repository;

import com.vendify.products.model.Product;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ProductsRepository extends ReactiveCrudRepository<Product, Long> {
    @Query("SELECT * FROM products WHERE store = :store")
    Flux<Product> findProductsByStore(String store);
}
