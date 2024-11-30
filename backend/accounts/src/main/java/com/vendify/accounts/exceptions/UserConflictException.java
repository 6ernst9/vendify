package com.vendify.accounts.exceptions;

public class UserConflictException extends GenericException {
    public UserConflictException(String message, String description) {
        super(message, description);
    }
}
