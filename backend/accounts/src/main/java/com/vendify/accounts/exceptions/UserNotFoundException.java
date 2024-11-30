package com.vendify.accounts.exceptions;

public class UserNotFoundException extends GenericException {
    public UserNotFoundException(String message, String description) {
        super(message, description);
    }
}
