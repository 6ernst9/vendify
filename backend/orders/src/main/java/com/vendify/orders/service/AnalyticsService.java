package com.vendify.orders.service;

import com.vendify.orders.model.analytics.*;
import com.vendify.orders.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    private final OrderRepository orderRepository;

    public Flux<Double> getQuickKPIs(String storeId) {
        var ldt = LocalDate.now().atStartOfDay();
        var date = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());

        var totalRevenue = orderRepository.getTotalRevenue(storeId).defaultIfEmpty(0.0);
        var todayRevenue = orderRepository.getRevenueToday(storeId, date).defaultIfEmpty(0.0);
        var todayOrders = orderRepository.getOrdersToday(storeId, date).defaultIfEmpty(0L);
        var avgOrder = orderRepository.getAverageOrderValue(storeId).defaultIfEmpty(0.0);

        return Mono.zip(totalRevenue, todayRevenue, todayOrders, avgOrder)
                .flatMapMany(tuple -> {
                    var revenueTotal = tuple.getT1();
                    var revenueToday = tuple.getT2();
                    var ordersToday = (double) tuple.getT3();
                    var avgOrderValue = tuple.getT4();

                    return Flux.just(revenueTotal, revenueToday, ordersToday, avgOrderValue);
                });
    }

    public Flux<Double> getHomeKPIs(String storeId) {
        var totalRevenue = orderRepository.getTotalRevenue(storeId).defaultIfEmpty(0.0);
        var totalOrders = orderRepository.getOrdersCount(storeId).defaultIfEmpty(0L);

        return Mono.zip(totalRevenue, totalOrders)
                .flatMapMany(tuple -> {
                    var revenueTotal = tuple.getT1();
                    var orders = (double)tuple.getT2();

                    return Flux.just(revenueTotal, orders);
                });
    }

    public Flux<RevenuePerDay> getRevenuePerDay(String storeId) {
        var from = LocalDateTime.now().minusDays(14);

        return orderRepository.getRevenuePerDay(storeId, from)
                .collectMap(RevenuePerDay::day, RevenuePerDay::revenue)
                .map(dataMap -> {
                    var lastNDays = generateLastNDays(14);
                    return lastNDays.stream()
                            .map(day -> new RevenuePerDay(day, dataMap.getOrDefault(day, 0.0)))
                            .toList();
                }).flatMapMany(Flux::fromIterable);
    }

    public Flux<OrdersPerDay> getOrdersPerDay(String storeId) {
        var from = LocalDateTime.now().minusDays(14);

        return orderRepository.getOrdersPerDay(storeId, from)
                .collectMap(OrdersPerDay::day, OrdersPerDay::orders)
                .map(dataMap -> {
                    var lastNDays = generateLastNDays(14);
                    return lastNDays.stream()
                            .map(day -> new OrdersPerDay(day, dataMap.getOrDefault(day, 0)))
                            .toList();
                }).flatMapMany(Flux::fromIterable);
    }

    public Flux<AverageOrderValueTrend> getAverageOrderValueTrend(String storeId) {
        var from = LocalDateTime.now().minusDays(14);

        return orderRepository.getAverageOrderValuePerDay(storeId, from)
                .collectMap(AverageOrderValueTrend::day, AverageOrderValueTrend::averageOrderValue)
                .map(dataMap -> {
                    var lastNDays = generateLastNDays(14);
                    return lastNDays.stream()
                            .map(day -> new AverageOrderValueTrend(day, dataMap.getOrDefault(day, 0.0)))
                            .toList();
                }).flatMapMany(Flux::fromIterable);
    }

    public Flux<ProductRevenue> getProductRevenue(String storeId) {
        return orderRepository.getTopRevenueProducts(storeId, 10);
    }

    public Flux<ProductSalesMetrics> getProductConversion(String storeId) {
        return orderRepository.getProductSalesByStore(storeId);
    }

    public Flux<ProductSalesCount> getTopSellingProducts(String storeId) {
        return orderRepository.getTopSellingProducts(storeId, 10);
    }

    public Flux<CustomerOrderCount> getCustomerOrders(String storeId) {
        return orderRepository.getCustomersByOrderVolume(storeId);
    }

    public Flux<CustomerRevenue> getCustomerRevenue(String storeId) {
        return orderRepository.getRevenueByCustomer(storeId);
    }

    public Flux<CustomerType> getCustomerRatio(String storeId) {
        return orderRepository.getReturningVsNewCustomers(storeId).flatMapMany(customerRatio -> Flux.just(
                new CustomerType("New", customerRatio.newCustomers()),
                new CustomerType("Old", customerRatio.returningCustomers())
        ));
    }

    private List<String> generateLastNDays(int n) {
        return IntStream.rangeClosed(0, n - 1)
                .mapToObj(i -> LocalDate.now().minusDays(n - 1 - i).toString())
                .toList();
    }
}
