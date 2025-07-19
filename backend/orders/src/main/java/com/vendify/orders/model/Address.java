package com.vendify.orders.model;

import com.mongodb.lang.Nullable;

public record Address(String street, String city, @Nullable String apartment, String phoneNumber, String zipCode ) {
}
