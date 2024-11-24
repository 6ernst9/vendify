package com.vendify.accounts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class UserDto {
    private final String username;
    private final String firstName;
    private final String lastName;
    private final int age;
    private final String email;
    private final String phoneNumber;
    private final String password;
}
