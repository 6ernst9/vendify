package com.vendify.products.repository;

import com.vendify.products.model.Sale;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SaleRepository extends ReactiveCrudRepository<Sale, Long> {
    @Query("SELECT * FROM sales WHERE store = :store AND end_date > NOW() ORDER BY end_date ASC LIMIT 1")
    Mono<Sale> findNextActiveSaleByStore(String store);

}
