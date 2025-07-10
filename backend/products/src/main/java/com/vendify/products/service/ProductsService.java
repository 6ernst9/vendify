package com.vendify.products.service;

import com.vendify.products.model.OrderItem;
import com.vendify.products.model.Product;
import com.vendify.products.model.ProductDto;
import com.vendify.products.repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductsService {
    private final ProductsRepository productsRepository;

    public Mono<Product> getProductById(long id) {
        return productsRepository.findById(id);
    }

    public Flux<Product> getAllStoreProducts(String store) {
        return productsRepository.findProductsByStore(store);
    }

    public Flux<Product> getAllStoreProductsByCategory(String store, String category) {
        return productsRepository.findProductsByStoreAndCategory(store, category);
    }

    public Flux<Product> getDiscountedProducts(String storeId) {
        return productsRepository.findDiscountedProductsByStore(storeId);
    }

    public Flux<Product> getRelatedProducts(long id) {
        return productsRepository.findById(id).flatMapMany(product -> productsRepository.findRelatedProducts(
                product.getStore(),
                product.getCategory(),
                product.getId()));
    }

    public Flux<Product> getNewestProducts(String storeId) {
        return productsRepository.findNewestProductsByStore(storeId);
    }

    public Mono<Product> addProduct(ProductDto product) {
        return productsRepository.save(
                new Product(
                        product.getStore(),
                        product.getName(),
                        product.getImages(),
                        product.getCategory(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getReviews(),
                        product.getNoReviews(),
                        product.getStock()
                )
        );
    }

    public void addProducts(List<ProductDto> products) {
         products.forEach(product -> productsRepository.save(
                new Product(
                        product.getStore(),
                        product.getName(),
                        product.getImages(),
                        product.getCategory(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getReviews(),
                        product.getNoReviews(),
                        product.getStock()
                )
        ).subscribe());
    }

    public Mono<Product> updateProduct(Product productDto) {
        return productsRepository.findById(productDto.getId())
                .flatMap(product -> {
                    product.setStock(productDto.getStock());
                    product.setPrice(productDto.getPrice());
                    product.setDescription(productDto.getDescription());
                    product.setStore(productDto.getStore());
                    product.setCategory(productDto.getCategory());
                    product.setImages(productDto.getImages());
                    product.setName(productDto.getName());
                    return productsRepository.save(product);
                });
    }

    public Mono<Void> deleteProduct(long id) {
        return productsRepository.findById(id)
                .flatMap(product -> productsRepository.deleteById(id));
    }

    public Mono<Void> updateStock(List<OrderItem> items) {
        return Flux.fromIterable(items)
                .flatMap(item ->
                        productsRepository.findById(item.productId())
                                .flatMap(product -> {
                                    product.setStock(product.getStock() - item.quantity());
                                    return productsRepository.save(product).then();
                                })
                )
                .then();
    }

    public Mono<Product> updateRating(int review, long productId) {
        return productsRepository.findById(productId).flatMap(product -> {
            var reviews = product.getReviews() * product.getNoReviews() + review;
            var noReviews = product.getNoReviews() + 1;
            var newReview = reviews / noReviews;

            product.setReviews(newReview);
            product.setNoReviews(noReviews);
            return productsRepository.save(product);
        });
    }
}
