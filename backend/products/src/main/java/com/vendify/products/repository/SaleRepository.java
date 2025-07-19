package com.vendify.products.repository;

import com.vendify.products.model.Sale;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface SaleRepository extends ReactiveCrudRepository<Sale, Long> {
    @Query("SELECT * FROM sales WHERE store = :store AND status = 'ACTIVE' AND code IS NULL ORDER BY end_date ASC LIMIT 1")
    Mono<Sale> findNextActiveSaleByStore(String store);

    @Query("SELECT * FROM sales WHERE store = :store ORDER BY end_date ASC")
    Flux<Sale> findSalesByStore(String store);

    @Query("SELECT * FROM sales WHERE store = :store AND code = :code AND status = 'ACTIVE' ORDER BY end_date ASC")
    Mono<Sale> findCouponByCode(String code, String store);
}
