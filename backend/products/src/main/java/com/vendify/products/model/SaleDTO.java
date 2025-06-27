package com.vendify.products.model;

import jakarta.annotation.Nullable;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class SaleDTO {
    private String name;
    @Nullable
    private String code;
    private String store;
    private double percentage;
    private List<Long> productIds;
    @Nullable
    private String category;
    private LocalDate endDate;
}
