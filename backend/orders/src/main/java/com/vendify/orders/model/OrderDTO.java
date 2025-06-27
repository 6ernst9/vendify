package com.vendify.orders.model;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderDTO {
    private String storeId;
    private long customerId;
    @Nullable
    private String coupon;
    private Address address;
    private double price;
}
