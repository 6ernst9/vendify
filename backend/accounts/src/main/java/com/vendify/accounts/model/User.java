package com.vendify.accounts.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private long id;
    @NonNull
    private String username;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    private int age;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String phoneNumber;
    private long sessionId;

    public User(@NonNull String username, @NonNull String firstName, @NonNull String lastName, int age, @NonNull String email, @NonNull String password, @NonNull String phoneNumber) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}
