package com.vendify.products.repository;

import com.vendify.products.model.Sale;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends ReactiveCrudRepository<Sale, Long> {
}
