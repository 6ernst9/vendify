package com.vendify.orders.repository;

import com.vendify.orders.model.Order;
import com.vendify.orders.model.analytics.*;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Date;

public interface OrderRepository extends ReactiveCrudRepository<Order, String> {
    Flux<Order> findByCustomerIdOrderByCreatedAtDesc(long customerId);
    Flux<Order> findByStoreIdOrderByCreatedAtDesc(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $unwind: '$items' }",
            "{ $group: { _id: '$items.productId', totalSold: { $sum: '$items.quantity' } } }",
            "{ $sort: { totalSold: -1 } }",
            "{ $limit: ?1 }",
            "{ $project: { _id: 1 } }"
    })
    Flux<Long> findTopSellingProductIdsByStore(String storeId, int limit);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $group: { _id: null, totalRevenue: { $sum: '$price' } } }",
            "{ $project: { _id: 0, totalRevenue: 1 } }"
    })
    Mono<Double> getTotalRevenue(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0, createdAt: { $gte: { $date: ?1 } } } }",
            "{ $count: 'orderCount' }"
    })
    Mono<Long> getOrdersToday(String storeId, Date todayStart);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $count: 'orderCount' }"
    })
    Mono<Long> getOrdersCount(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $group: { _id: null, averagePrice: { $avg: '$price' } } }",
            "{ $project: { _id: 0, averagePrice: 1 } }"
    })
    Mono<Double> getAverageOrderValue(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0, createdAt: { $gte: { $date: ?1 } } } }",
            "{ $group: { _id: null, revenueToday: { $sum: '$price' } } }",
            "{ $project: { _id: 0, revenueToday: 1 } }"
    })
    Mono<Double> getRevenueToday(String storeId, Date todayStart);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0, createdAt: { $gte: ?1 } } }",
            "{ $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, revenue: { $sum: '$price' } } }",
            "{ $sort: { _id: 1 } }",
            "{ $project: { day: '$_id', revenue: 1, _id: 0 } }"
    })
    Flux<RevenuePerDay> getRevenuePerDay(String storeId, LocalDateTime fromDate);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0, createdAt: { $gte: ?1 } } }",
            "{ $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, orders: { $sum: 1 } } }",
            "{ $sort: { _id: 1 } }",
            "{ $project: { day: '$_id', orders: 1, _id: 0 } }"
    })
    Flux<OrdersPerDay> getOrdersPerDay(String storeId, LocalDateTime fromDate);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0, createdAt: { $gte: ?1 } } }",
            "{ $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, average: { $avg: '$price' } } }",
            "{ $sort: { _id: 1 } }",
            "{ $project: { day: '$_id', averageOrderValue: '$average', _id: 0 } }"
    })
    Flux<AverageOrderValueTrend> getAverageOrderValuePerDay(String storeId, LocalDateTime fromDate);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $unwind: '$items' }",
            "{ $group: { _id: '$items.productId', totalSold: { $sum: '$items.quantity' } } }",
            "{ $sort: { totalSold: -1 } }",
            "{ $limit: ?1 }",
            "{ $project: { productId: '$_id', totalSold: 1, _id: 0 } }"
    })
    Flux<ProductSalesCount> getTopSellingProducts(String storeId, int limit);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $unwind: '$items' }",
            "{ $group: { _id: '$items.productId', revenue: { $sum: { $multiply: ['$price', { $divide: ['$items.quantity', { $sum: '$items.quantity' }] }] } } } }",
            "{ $sort: { revenue: -1 } }",
            "{ $limit: ?1 }",
            "{ $project: { productId: '$_id', revenue: 1, _id: 0 } }"
    })
    Flux<ProductRevenue> getTopRevenueProducts(String storeId, int limit);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $unwind: '$items' }",
            "{ $group: { _id: '$items.productId', totalSold: { $sum: '$items.quantity' }, revenue: { $sum: '$price' } } }",
            "{ $project: { productId: '$_id', totalSold: 1, revenue: 1, _id: 0 } }"
    })
    Flux<ProductSalesMetrics> getProductSalesByStore(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $group: { _id: '$customerId', orderCount: { $sum: 1 } } }",
            "{ $group: { _id: null, newCustomers: { $sum: { $cond: [{ $eq: ['$orderCount', 1] }, 1, 0] } }, returningCustomers: { $sum: { $cond: [{ $gt: ['$orderCount', 1] }, 1, 0] } }} }",
            "{ $project: { _id: 0, newCustomers: 1, returningCustomers: 1 } }"
            })
    Mono<CustomerRatio> getReturningVsNewCustomers(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $group: { _id: '$customerId', orderCount: { $sum: 1 } } }",
            "{ $sort: { orderCount: -1 } }",
            "{ $project: { customerId: '$_id', orderCount: 1, _id: 0 } }"
    })
    Flux<CustomerOrderCount> getCustomersByOrderVolume(String storeId);

    @Aggregation(pipeline = {
            "{ $match: { storeId: ?0 } }",
            "{ $group: { _id: '$customerId', totalRevenue: { $sum: '$price' } } }",
            "{ $sort: { totalRevenue: -1 } }",
            "{ $project: { customerId: '$_id', totalRevenue: 1, _id: 0 } }"
    })
    Flux<CustomerRevenue> getRevenueByCustomer(String storeId);
}
