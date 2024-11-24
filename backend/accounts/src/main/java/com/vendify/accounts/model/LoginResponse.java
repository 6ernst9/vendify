package com.vendify.accounts.model;

public record LoginResponse(Long id, String accessToken, String refreshToken) {
}
