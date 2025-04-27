package com.vendify.stores.service;

import com.vendify.stores.model.Store;
import com.vendify.stores.model.StoreDto;
import com.vendify.stores.repository.StoresRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class StoresService {
    private final StoresRepository storesRepository;

    public Flux<Store> getStores() {
        return storesRepository.findAll();
    }

    public Flux<Store> getStoreByOwner(long id) {
        return storesRepository.findByOwnerId(id);
    }

    public Mono<Store> addStore(StoreDto storeDto) {
        return storesRepository.save(
                new Store(
                        storeDto.getOwner(),
                        storeDto.getName(),
                        storeDto.getLogo(),
                        storeDto.getPath(),
                        storeDto.getBanner(),
                        storeDto.getTheme(),
                        storeDto.getContactLinks()
                )
        );
    }

    public Mono<Store> getStoreById(long id){
        return storesRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Store not found")));
    }

    public Mono<Store> getStoreByName(String path){
        return storesRepository.findByPath(path)
                .switchIfEmpty(Mono.error(new RuntimeException("Store not found")));
    }
}
