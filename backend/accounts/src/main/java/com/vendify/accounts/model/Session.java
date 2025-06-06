package com.vendify.accounts.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Table(name = "session")
@AllArgsConstructor
@NoArgsConstructor
public class Session {
    @Id
    private long id;
    private Long userId;
    @NonNull
    private String storeId;
    @NonNull
    private String sessionCookie;
    @NonNull
    private LocalDateTime lastActivity;
    @NonNull
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String accessToken;
    private String refreshToken;
    @NonNull
    private List<String> pagesVisited;
    @NonNull
    private List<String> actions;

    public Session(Long userId, @NonNull String storeId, @NonNull String sessionCookie, String accessToken, String refreshToken) {
        this.userId = userId;
        this.storeId = storeId;
        this.sessionCookie = sessionCookie;
        this.lastActivity = LocalDateTime.now();
        this.startTime = LocalDateTime.now();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.pagesVisited = new ArrayList<>();
        this.actions = new ArrayList<>();
    }

    public Session(@NonNull String storeId, @NonNull String sessionCookie, List<String> pagesVisited, List<String> actions) {
        this.storeId = storeId;
        this.sessionCookie = sessionCookie;
        this.lastActivity = LocalDateTime.now();
        this.startTime = LocalDateTime.now();
        this.pagesVisited = pagesVisited;
        this.actions = actions;
    }
}
