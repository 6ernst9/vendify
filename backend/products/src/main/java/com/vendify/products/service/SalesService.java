package com.vendify.products.service;

import com.vendify.products.model.Sale;
import com.vendify.products.model.SaleDTO;
import com.vendify.products.repository.ProductsRepository;
import com.vendify.products.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SalesService {
    private final SaleRepository saleRepository;
    private final ProductsRepository productsRepository;

    public Mono<Void> createSale(SaleDTO saleDTO) {
        var sale = new Sale(saleDTO.getName(), saleDTO.getStore(), saleDTO.getPercentage(), saleDTO.getProductIds(), saleDTO.getEndDate());
        return saleRepository.save(sale)
                .then(productsRepository.applyDiscountToProducts(saleDTO.getPercentage() / 100, saleDTO.getProductIds()));
    }

    public Mono<Sale> getSale(String storeId) {
        return saleRepository.findNextActiveSaleByStore(storeId);
    }
}
