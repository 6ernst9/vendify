package com.vendify.orders.controller;

import com.vendify.orders.model.analytics.*;
import com.vendify.orders.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    @GetMapping("/get-quick-kpis/{storeId}")
    public Flux<Double> getQuickKPIs(@PathVariable String storeId) {
        return analyticsService.getQuickKPIs(storeId);
    }

    @GetMapping("/get-home-kpis/{storeId}")
    public Flux<Double> getHomeKPIs(@PathVariable String storeId) {
        return analyticsService.getHomeKPIs(storeId);
    }

    @GetMapping("/get-revenue-per-day/{storeId}")
    public Flux<RevenuePerDay> getRevenuePerDay(@PathVariable String storeId) {
        return analyticsService.getRevenuePerDay(storeId);
    }

    @GetMapping("/get-orders-per-day/{storeId}")
    public Flux<OrdersPerDay> getOrdersPerDay(@PathVariable String storeId) {
        return analyticsService.getOrdersPerDay(storeId);
    }

    @GetMapping("/get-average-order-value/{storeId}")
    public Flux<AverageOrderValueTrend> getAverageOrderValue(@PathVariable String storeId) {
        return analyticsService.getAverageOrderValueTrend(storeId);
    }

    @GetMapping("/get-top-selling-products/{storeId}")
    public Flux<ProductSalesCount> getTopSellingProducts(@PathVariable String storeId) {
        return analyticsService.getTopSellingProducts(storeId);
    }

    @GetMapping("/get-product-revenue/{storeId}")
    public Flux<ProductRevenue> getProductRevenue(@PathVariable String storeId) {
        return analyticsService.getProductRevenue(storeId);
    }

    @GetMapping("/get-product-conversion/{storeId}")
    public Flux<ProductSalesMetrics> getProductMetrics(@PathVariable String storeId) {
        return analyticsService.getProductConversion(storeId);
    }

    @GetMapping("/get-customer-ratio/{storeId}")
    public Flux<CustomerType> getCustomerRatio(@PathVariable String storeId) {
        return analyticsService.getCustomerRatio(storeId);
    }

    @GetMapping("/get-customer-revenue/{storeId}")
    public Flux<CustomerRevenue> getCustomerRevenue(@PathVariable String storeId) {
        return analyticsService.getCustomerRevenue(storeId);
    }

    @GetMapping("/get-customer-orders/{storeId}")
    public Flux<CustomerOrderCount> getCustomerOrders(@PathVariable String storeId) {
        return analyticsService.getCustomerOrders(storeId);
    }
}
