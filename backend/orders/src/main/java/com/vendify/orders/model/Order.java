package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@AllArgsConstructor
public class Order {
    private final long id;
    private final long userId;
    private final List<Long> products;
    private final Timestamp timestamp;
    private final double price;
    private final String status;
}
