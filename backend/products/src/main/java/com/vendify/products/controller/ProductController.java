package com.vendify.products.controller;

import com.vendify.products.model.Product;
import com.vendify.products.model.ProductDto;
import com.vendify.products.model.ResponseDto;
import com.vendify.products.service.ProductsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductsService productsService;

    @GetMapping("/get-product-by-id/{id}")
    public Mono<Product> getProductById(@PathVariable long id){
        log.info("Performing GET /get-product-by-id call. Input: id={}", id);
        var product = productsService.getProductById(id);
        log.info("Performed GET /get-product-by-id call. Input: id={}. Output={}", id, product);
        return product;
    }

    @GetMapping("/get-products-by-store/{store}")
    public Flux<Product> getProductsByStore(@PathVariable String store){
        log.info("Performing GET /get-products-by-store call. Input: store={}", store);
        var products = productsService.getAllStoreProducts(store);
        log.info("Performed GET get-products-by-store call. Input: store={}. Output={}", store, products);
        return products;
    }

    @PostMapping("/add-product")
    public Mono<ResponseDto> addProduct(@RequestBody ProductDto productDto){
        log.info("Performing POST /add-product call. Input: product={}", productDto);
        return productsService.addProduct(productDto).flatMap(product -> {
            log.info("Performed POST /add-product call. Input: product={}", productDto);
            return Mono.just(new ResponseDto("product_added", "Product added successfully."));
        });
    }

    @PostMapping("/add-products")
    public Mono<ResponseDto> addProducts(@RequestBody List<ProductDto> product){
        log.info("Performing POST /add-products call. Input: products={}", product);
        productsService.addProducts(product);
        log.info("Performed POST /add-products call. Input: products={}", product);
        return Mono.just(new ResponseDto("product_added", "Products added successfully."));
    }
}
