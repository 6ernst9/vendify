package com.vendify.accounts.util;

import java.util.regex.Pattern;

public class ValidationUtils {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[\\w._%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$"
    );

    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile(
            "^\\+?[0-9]{1,3}?[-.\\s]?\\(?(\\d{1,4})\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$"
    );

    /**
     * Verifies if a string is a valid email.
     *
     * @param email the string to verify
     * @return true if the string is a valid email, false otherwise
     */
    public static boolean isEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Verifies if a string is a valid phone number.
     *
     * @param phoneNumber the string to verify
     * @return true if the string is a valid phone number, false otherwise
     */
    public static boolean isPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return false;
        }
        return PHONE_NUMBER_PATTERN.matcher(phoneNumber).matches();
    }
}