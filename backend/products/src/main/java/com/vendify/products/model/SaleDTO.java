package com.vendify.products.model;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class SaleDTO {
    private String name;
    private String store;
    private double percentage;
    private List<Long> productIds;
    private LocalDateTime endDate;
}
