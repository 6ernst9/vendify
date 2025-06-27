package com.vendify.products.controller;

import com.vendify.products.model.Sale;
import com.vendify.products.model.SaleDTO;
import com.vendify.products.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
    private final SalesService salesService;

    @PostMapping("/create-sale")
    public Mono<String> createDiscount(@RequestBody SaleDTO discount) {
        return salesService.createSale(discount).thenReturn("Sale created successfully");
    }

    @GetMapping("/get-sales/{storeId}")
    public Mono<Sale> getDiscount(@PathVariable String storeId) {
        return salesService.getSale(storeId);
    }

    @GetMapping("/get-deals/{storeId}")
    public Flux<Sale> getSales(@PathVariable String storeId) {
        return salesService.getSales(storeId);
    }

    @GetMapping("/get-coupon/{code}/{storeId}")
    public Mono<Sale> getCoupon(@PathVariable String storeId,
                                @PathVariable String code) {
        return salesService.getCoupon(code, storeId);
    }

    @PutMapping("/apply-coupon/{code}/{storeId}")
    public Mono<Sale> applyCoupon(@PathVariable String storeId,
                                  @PathVariable String code) {
        return salesService.applyCoupon(code, storeId);
    }
}
