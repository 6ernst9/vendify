package com.vendify.products.service;

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
        return productsRepository.findById(id).flatMapMany(product -> {
            return productsRepository.findRelatedProducts(
                    product.getStore(),
                    product.getCategory(),
                    product.getId());
        });
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
                        product.getSizes(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getReviews(),
                        product.getStock()
                )
        );
    }

    public void addProducts(List<ProductDto> products) {
         products.forEach(product -> {
             productsRepository.save(
                    new Product(
                            product.getStore(),
                            product.getName(),
                            product.getImages(),
                            product.getCategory(),
                            product.getSizes(),
                            product.getPrice(),
                            product.getDescription(),
                            product.getReviews(),
                            product.getStock()
                    )
            ).subscribe();
        });
    }
}
