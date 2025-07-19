package com.vendify.stores.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "stores")
public class Store {
    @Id
    private String id;
    private long owner;
    private String name;
    private String logo;
    private String path;
    private String banner;
    private List<String> categories;
    private Theme theme;
    private ContactLinks contactLinks;

    public Store(long owner, String name, String logo, String path, String banner, List<String> categories, Theme theme, ContactLinks contactLinks) {
        this.name = name;
        this.logo = logo;
        this.owner = owner;
        this.path = path;
        this.banner = banner;
        this.categories = categories;
        this.theme = theme;
        this.contactLinks = contactLinks;
    }

    public Store(long owner, String name, String logo, String path, String banner, Theme theme, ContactLinks contactLinks) {
        this.name = name;
        this.owner = owner;
        this.logo = logo;
        this.path = path;
        this.banner = banner;
        this.categories = new ArrayList<>();
        this.theme = theme;
        this.contactLinks = contactLinks;
    }
}
