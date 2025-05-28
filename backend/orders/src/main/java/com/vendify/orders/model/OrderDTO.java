package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderDTO {
    private String storeId;
    private long customerId;
    private Address address;
    private double price;
}
