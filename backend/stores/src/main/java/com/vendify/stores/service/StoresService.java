package com.vendify.stores.service;

import com.vendify.stores.model.Store;
import com.vendify.stores.repository.StoresRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class StoresService {
    private final StoresRepository storesRepository;

    public Mono<Store> getStoreById(long id){
        return storesRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Store not found")));
    }

    public Flux<Store> getStoresByOwner(long id){
        return storesRepository.findAllByOwner(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Store not found")));
    }
}
