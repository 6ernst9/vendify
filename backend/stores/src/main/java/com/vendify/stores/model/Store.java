package com.vendify.stores.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Store {
    private Long id;
    private String name;
    private List<Long> owners;
    private String logo;
    private String path;
    private String banner;
    private List<Category> categories;
    private Theme theme;
    private ContactLinks contactLinks;

    public Store(String name, List<Long> owners, String logo, String path, String banner, List<Category> categories, Theme theme, ContactLinks contactLinks) {
        this.name = name;
        this.owners = owners;
        this.logo = logo;
        this.path = path;
        this.banner = banner;
        this.categories = categories;
        this.theme = theme;
        this.contactLinks = contactLinks;
    }
}
