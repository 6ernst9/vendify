package com.vendify.accounts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class User {
    private final long id;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final int age;
    private final String email;
    private final String password;
    private final String sessionId;
}
