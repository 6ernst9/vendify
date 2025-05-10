package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderDTO {
    private String storeId;
    private long customerId;
    private List<OrderItem> items;
    private LocalDateTime createdAt;
}
