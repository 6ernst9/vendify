package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Wishlist {
    private String storeId;
    private long customerId;
    private long productId;
}
