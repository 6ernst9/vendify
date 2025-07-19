package com.vendify.products.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@AllArgsConstructor
public class ProductDto {
    private final String store;
    private final String name;
    private final List<String> images;
    private final String category;
    private final double price;
    private final String description;
    private final double reviews;
    private final int noReviews;
    private final int stock;
}
