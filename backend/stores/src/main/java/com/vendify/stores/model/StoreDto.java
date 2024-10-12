package com.vendify.stores.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class StoreDto {
    private final String name;
    private final List<Long> owners;
    private final String logo;
    private final String path;
    private final String banner;
    private final List<Category> categories;
    private final Theme theme;
    private final ContactLinks contactLinks;
}
