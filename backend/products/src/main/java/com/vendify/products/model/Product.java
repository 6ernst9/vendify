package com.vendify.products.model;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Getter
@Setter
@Table(name= "products")
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private long id;
    private String store;
    private String name;
    private List<String> images;
    private String category;
    private double price;
    @Nullable
    private double oldPrice;
    private String description;
    private double reviews;
    private int noReviews;
    private int stock;

    public Product(String store, String name, List<String> images, String category, double price, String description, double reviews, int noReviews, int stock) {
        this.store = store;
        this.name = name;
        this.images = images;
        this.category = category;
        this.price = price;
        this.description = description;
        this.reviews = reviews;
        this.noReviews = noReviews;
        this.stock = stock;
    }
}
