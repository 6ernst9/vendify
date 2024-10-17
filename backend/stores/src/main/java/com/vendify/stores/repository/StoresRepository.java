package com.vendify.stores.repository;

import com.vendify.stores.model.Store;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface StoresRepository extends ReactiveCrudRepository<Store, Long> {
    @Query("{ 'owners':  { '$in':  [?0] }}")
    Flux<Store> findAllByOwner(long id);
}
