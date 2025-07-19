package com.vendify.products.model;

import jakarta.annotation.Nullable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Table(name= "sales")
@NoArgsConstructor
@AllArgsConstructor
public class Sale {
    @Id
    private long id;
    private String name;
    @Nullable
    private String code;
    private String store;
    private String status;
    private double percentage;
    private List<Long> productIds;
    private LocalDate endDate;

    public Sale(String name, @Nullable String code, String store, String status, double percentage, List<Long> productIds, LocalDate endDate) {
        this.name = name;
        this.store = store;
        this.percentage = percentage;
        this.status = status;
        this.code = code;
        this.productIds = productIds;
        this.endDate = endDate;
    }
}

