package com.vendify.accounts.exceptions;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GenericException extends RuntimeException {
    private final String message;
    private final String description;

    public GenericException(String message, String description) {
        super(message);
        this.message = message;
        this.description = description;
    }
}
