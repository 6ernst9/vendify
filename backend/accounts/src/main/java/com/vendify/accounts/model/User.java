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
    private String firstName;
    @NonNull
    private String lastName;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String phoneNumber;
    @NonNull
    private String storeId;

    public User(@NonNull String firstName, @NonNull String lastName, @NonNull String email, @NonNull String password, @NonNull String phoneNumber, @NonNull String storeId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.storeId = storeId;
    }
}
