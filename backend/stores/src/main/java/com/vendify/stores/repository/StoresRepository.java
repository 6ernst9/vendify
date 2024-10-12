package com.vendify.stores.repository;

import com.vendify.stores.model.Store;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface StoresRepository extends ReactiveCrudRepository<Store, Long> {
}
