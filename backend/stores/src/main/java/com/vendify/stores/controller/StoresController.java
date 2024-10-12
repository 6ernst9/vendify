package com.vendify.stores.controller;

import com.vendify.stores.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class StoresController {
    @GetMapping("/get-stores-by-id/{id}")
    public Mono<Store> getStoreById(@PathVariable long id){

    }

    @GetMapping("/get-stores-by-owner/{id}")
    public Flux<Store> getStoresByOwner(@PathVariable long id){

    }

    @PostMapping("/add-store")
    public Mono<ResponseDto> addStore(@RequestBody StoreDto storeDto){

    }

    @PutMapping("/change-path")
    public Mono<ResponseDto> changePath(@RequestBody String path){}
    @PutMapping("/change-name")
    public Mono<ResponseDto> changeName(@RequestBody String name){}
    @PutMapping("/change-theme")
    public Mono<ResponseDto> changeTheme(@RequestBody Theme theme){}
    @PutMapping("/change-contact-links")
    public Mono<ResponseDto> changeContactLinks(@RequestBody ContactLinks contactLinks){}
    @PutMapping("/change-banner")
    public Mono<ResponseDto> changeBanner(@RequestBody String banner){}
    @PutMapping("/change-categories")
    public Mono<ResponseDto> changeCategories(@RequestBody List<Category> categories){}

    @DeleteMapping("/delete-store/{id}")
    public Mono<ResponseDto> deleteStore(@PathVariable long id){

    }
}
