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

    public Mono<Store> updateStore(Store storeDto) {
        return storesRepository.findById(storeDto.getId())
                .flatMap(store -> {
                    store.setName(storeDto.getName());
                    store.setLogo(storeDto.getLogo());
                    store.setPath(storeDto.getPath());
                    store.setBanner(storeDto.getBanner());
                    store.setTheme(storeDto.getTheme());
                    store.setContactLinks(storeDto.getContactLinks());
                    return storesRepository.save(store);
                });
    }

    public Mono<Store> getStoreById(String id){
        return storesRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Store not found")));
    }

    public Mono<Void> deleteStore(String id){
        return storesRepository.findById(id)
                .flatMap(store -> storesRepository.deleteById(store.getId()));
    }

    public Mono<Store> getStoreByName(String path){
        return storesRepository.findByPath(path)
                .switchIfEmpty(Mono.error(new RuntimeException("Store not found")));
    }
}
