package com.vendify.accounts.exceptions;

public class InvalidCredentials extends GenericException {
    public InvalidCredentials(String message, String description) {
        super(message, description);
    }
}
