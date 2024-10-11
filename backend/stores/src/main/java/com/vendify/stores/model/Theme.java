package com.vendify.stores.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Theme {
    private final String primaryColor;
    private final String secondaryColor;
    private final String lightColor;
    private final String darkColor;
    private final String font;
}
