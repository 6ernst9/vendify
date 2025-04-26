package com.vendify.stores.controller;

import com.vendify.stores.model.*;
import com.vendify.stores.service.StoresService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoresController {
    private final StoresService storesService;

    @GetMapping("/get-stores-by-id/{id}")
    public Mono<Store> getStoreById(@PathVariable long id){
        return storesService.getStoreById(id);
    }

    @GetMapping("/get-stores")
    public Flux<Store> getAllStores(){
        return storesService.getStores();
    }

//    @GetMapping("/get-stores-by-owner/{id}")
//    public Flux<Store> getStoresByOwner(@PathVariable long id){
//        return storesService.getStoresByOwner(id);
//    }

    @PostMapping("/add-store")
    public Mono<ResponseDto> addStore(@RequestBody StoreDto storeDto){
        return storesService.addStore(storeDto).then(Mono.just(new ResponseDto("store_created", "Store created successfully")));
    }
//
//    @PutMapping("/change-path")
//    public Mono<ResponseDto> changePath(@RequestBody String path){}
//    @PutMapping("/change-name")
//    public Mono<ResponseDto> changeName(@RequestBody String name){}
//    @PutMapping("/change-theme")
//    public Mono<ResponseDto> changeTheme(@RequestBody Theme theme){}
//    @PutMapping("/change-contact-links")
//    public Mono<ResponseDto> changeContactLinks(@RequestBody ContactLinks contactLinks){}
//    @PutMapping("/change-banner")
//    public Mono<ResponseDto> changeBanner(@RequestBody String banner){}
//
//    @DeleteMapping("/delete-store/{id}")
//    public Mono<ResponseDto> deleteStore(@PathVariable long id){
//
//    }
}
