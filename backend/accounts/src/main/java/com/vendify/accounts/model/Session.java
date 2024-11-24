package com.vendify.accounts.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Getter
@Setter
@Table(name = "session")
@AllArgsConstructor
@NoArgsConstructor
public class Session {
    @Id
    private long id;
    @NonNull
    private Long userId;
    @NonNull
    private LocalDateTime lastActivity;
    @NonNull
    private String accessToken;
    @NonNull
    private String refreshToken;

    public Session(@NonNull Long userId, @NonNull String accessToken, @NonNull String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.lastActivity = LocalDateTime.now();
    }
}
