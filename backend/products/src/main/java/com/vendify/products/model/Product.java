package com.vendify.products.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Product {
    private final long id;
    private final String name;
    private final List<String> images;
    private final long category;
    private final List<String> sizes;
    private final double price;
    private final String description;
    private final double reviews;
    private final int stock;
}
