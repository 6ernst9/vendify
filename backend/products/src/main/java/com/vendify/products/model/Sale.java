package com.vendify.products.model;

import lombok.*;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Table(name= "sales")
@NoArgsConstructor
@AllArgsConstructor
public class Sale {
    private long id;
    private String name;
    private String store;
    private double percentage;
    private List<Long> productIds;
    private LocalDateTime endDate;

    public Sale(String name, String store, double percentage, List<Long> productIds, LocalDateTime endDate) {
        this.name = name;
        this.store = store;
        this.percentage = percentage;
        this.productIds = productIds;
        this.endDate = endDate;
    }
}

