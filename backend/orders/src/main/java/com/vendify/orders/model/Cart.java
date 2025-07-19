package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Cart {
    private String storeId;
    private long customerId;
    private long productId;
    private int quantity;
}
