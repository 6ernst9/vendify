package com.vendify.accounts.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Getter
@Setter
@Table(name = "session")
@AllArgsConstructor
@NoArgsConstructor
public class Session {
    @Id
    private long id;
    @NonNull
    private String authorizationCode;
    @NonNull
    private Timestamp lastActivity;
    @NonNull
    private String accessToken;
    @NonNull
    private String refreshToken;

    public Session(@NonNull String authorizationCode, @NonNull Timestamp lastActivity, @NonNull String accessToken, @NonNull String refreshToken) {
        this.authorizationCode = authorizationCode;
        this.lastActivity = lastActivity;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
