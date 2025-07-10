package com.vendify.products.service;

import com.vendify.products.model.Product;
import com.vendify.products.model.Sale;
import com.vendify.products.model.SaleDTO;
import com.vendify.products.model.SaleStatus;
import com.vendify.products.repository.ProductsRepository;
import com.vendify.products.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesService {
    private final SaleRepository saleRepository;
    private final ProductsRepository productsRepository;

    public Mono<Void> createSale(SaleDTO saleDTO) {
        Mono<List<Long>> productIdsMono;

        if (!saleDTO.getProductIds().isEmpty()) {
            productIdsMono = Mono.just(saleDTO.getProductIds());
        } else {
            productIdsMono = productsRepository
                    .findProductsByStoreAndCategory(saleDTO.getStore(), saleDTO.getCategory())
                    .map(Product::getId)
                    .collectList();
        }

        return productIdsMono.flatMap(productIds -> {
            var sale = new Sale(
                    saleDTO.getName(),
                    saleDTO.getCode(),
                    saleDTO.getStore(),
                    SaleStatus.ACTIVE.name(),
                    saleDTO.getPercentage(),
                    productIds,
                    saleDTO.getEndDate()
            );

            if(saleDTO.getCode() == null) {
                return saleRepository.save(sale)
                        .then(productsRepository.applyDiscountToProducts(saleDTO.getPercentage() / 100, productIds));
            }

            return saleRepository.save(sale).then();
        });
    }

    public Mono<Sale> getCoupon(String code, String storeId) {
        return saleRepository.findCouponByCode(code, storeId);
    }

    public Mono<Sale> applyCoupon(String code, String storeId) {
        return saleRepository.findCouponByCode(code, storeId).flatMap(coupon -> {
            coupon.setStatus(SaleStatus.EXPIRED.name());
            return saleRepository.save(coupon);
        });
    }

    public Mono<Sale> getSale(String storeId) {
        return saleRepository.findNextActiveSaleByStore(storeId)
                .flatMap(sale -> {
                    if (sale.getEndDate().isBefore(LocalDate.now())) {
                        sale.setStatus(SaleStatus.EXPIRED.name());
                        return saleRepository.save(sale)
                                .then(getSale(storeId));
                    }
                    return Mono.just(sale);
                })
                .switchIfEmpty(Mono.empty());
    }

    public Mono<Sale> getSaleById(long id) {
        return saleRepository.findById(id)
                .switchIfEmpty(Mono.empty());
    }

    public Flux<Sale> getSales(String storeId) {
        return saleRepository.findSalesByStore(storeId);
    }

    public Mono<Void> deleteSale(long id) {
        return saleRepository.findById(id)
                .flatMap(sale -> saleRepository.deleteById(id));
    }
}
