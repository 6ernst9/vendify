package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("orders")
public class Order {
    @Id
    private String id;
    private String storeId;
    private long customerId;
    private String coupon;
    private Address address;
    private double price;
    private List<OrderItem> items;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private boolean rated;

    public Order(String storeId, long customerId, String coupon, Address address, double price, List<OrderItem> items, OrderStatus status, LocalDateTime createdAt) {
        this.storeId = storeId;
        this.customerId = customerId;
        this.address = address;
        this.price = price;
        this.items = items;
        this.coupon = coupon;
        this.status = status;
        this.createdAt = createdAt;
        this.rated = false;
    }
}
