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
}
