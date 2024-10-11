package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Cart {
    private final long id;
    private final long userId;
    private final List<Long> products;
    private final double price;
}
