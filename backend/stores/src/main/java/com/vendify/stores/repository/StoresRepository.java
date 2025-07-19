package com.vendify.stores.repository;

import com.vendify.stores.model.Store;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface StoresRepository extends ReactiveMongoRepository<Store, String> {
    @Query("{ 'owner' : ?0 }")
    Flux<Store> findByOwnerId(Long id);

    @Query("{ 'path' : ?0 }")
    Mono<Store> findByPath(String name);
}
