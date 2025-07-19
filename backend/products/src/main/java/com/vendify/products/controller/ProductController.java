package com.vendify.products.controller;

import com.vendify.products.model.OrderItem;
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
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductsService productsService;

    @GetMapping("/get-product-by-id/{id}")
    public Mono<Product> getProductById(@PathVariable long id){
        log.info("Performing GET /get-product-by-id call. Input: id={}", id);
        return productsService.getProductById(id)
                .flatMap(product -> {
                    log.info("Performed GET /get-product-by-id call. Input: id={}. Output={}", id, product);
                    return Mono.just(product);
                });
    }

    @GetMapping("/get-discounted-products/{storeId}")
    public Flux<Product> getDiscountedProducts(@PathVariable String storeId) {
        log.info("Performing GET /get-discounted-products call. Input: storeId={}", storeId);
        return productsService.getDiscountedProducts(storeId)
                .collectList()
                .doOnNext(list ->  log.info("Performing GET /get-discounted-products call. Input: storeId={}. Output: products={}", storeId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-related-products/{id}")
    public Flux<Product> getRelatedProducts(@PathVariable long id) {
        log.info("Performing GET /get-related-products call. Input: id={}", id);
        return productsService.getRelatedProducts(id)
                .collectList()
                .doOnNext(list ->  log.info("Performing GET /get-related-products call. Input: id={}. Output: products={}", id, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-newest-products/{storeId}")
    public Flux<Product> getNewestProducts(@PathVariable String storeId) {
        log.info("Performing GET /get-newest-products call. Input: storeId={}", storeId);
        return productsService.getNewestProducts(storeId)
                .collectList()
                .doOnNext(list ->  log.info("Performing GET /get-newest-products call. Input: storeId={}. Output: products={}", storeId, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-products-by-store/{store}")
    public Flux<Product> getProductsByStore(@PathVariable String store){
        log.info("Performing GET /get-products-by-store call. Input: store={}", store);
        return productsService.getAllStoreProducts(store)
                .collectList()
                .doOnNext(list -> log.info("Performed GET get-products-by-store call. Input: store={}. Output={}", store, list))
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/get-products-by-store-and-category/{store}/{category}")
    public Flux<Product> getProductsByStoreAndCategory(@PathVariable String store,
                                            @PathVariable String category) {
        log.info("Performing GET /get-products-by-store-and-category call. Input: store={}, category={}", store, category);
        return productsService.getAllStoreProductsByCategory(store, category)
                .collectList()
                .doOnNext(list -> log.info("Performed GET /get-products-by-store-and-category call. Input: store={}, category={}. Output={}", store, category, list))
                .flatMapMany(Flux::fromIterable);
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

    @PutMapping("/update-product")
    public Mono<ResponseDto> updateProduct(@RequestBody Product product){
        log.info("Performing PUT /update-product call. Input: product={}", product);
        var res = productsService.updateProduct(product);
        log.info("Performed PUT /update-product call. Input: product={}",product);
        return res.then(Mono.just(new ResponseDto("product_updated", "Product updated successfully.")));
    }

    @PutMapping("/update-stock")
    public Mono<ResponseDto> updateStock(@RequestBody List<OrderItem> items){
        log.info("Performing PUT /update-stock call. Input: items={}", items);
        var res = productsService.updateStock(items);
        log.info("Performed PUT /update-stock call. Input: items={}", items);
        return res.then(Mono.just(new ResponseDto("stock_updated", "Product stock updated successfully.")));
    }

    @PutMapping("/rate/{productId}/{review}")
    public Mono<ResponseDto> rate(@PathVariable long productId, @PathVariable int review){
        log.info("Performing PUT /rate call. Input: productId={}, review={}", productId, review);
        var res = productsService.updateRating(review, productId);
        log.info("Performed PUT /rate call. Input: productId={}, review={}", productId, review);
        return res.then(Mono.just(new ResponseDto("review_updated", "Product review updated successfully.")));
    }

    @DeleteMapping("/delete-product/{id}")
    public Mono<ResponseDto> deleteProduct(@PathVariable long id){
        log.info("Performing DELETE /delete-product call. Input: id={}", id);
        var res = productsService.deleteProduct(id);
        log.info("Performed DELETE /delete-product call. Input: id={}",id);
        return res.then(Mono.just(new ResponseDto("product_deleted", "Product deleted successfully.")));
    }
}
