package com.vendify.accounts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class Session {
    private final String id;
    private final String authorizationCode;
    private final Timestamp lastActivity;
    private final String accessToken;
    private final String refreshToken;
}
