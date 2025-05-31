package com.vendify.products.controller;

import com.vendify.products.model.SaleDTO;
import com.vendify.products.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
