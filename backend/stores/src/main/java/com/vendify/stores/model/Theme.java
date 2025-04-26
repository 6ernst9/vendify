package com.vendify.stores.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Theme {
    private final String primaryColor;
    private final String backgroundColor;
    private final String titleColor;
    private final String textSecondaryColor;
    private final String font;
    private final String buttonRadius;
    private final String cardRadius;
    private final String navbarStyle;
}
