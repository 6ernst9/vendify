package com.vendify.accounts.model.analytics;

public record ActiveUserStat(String sessionCookie, Long userId, Double totalMinutes, String favouritePage) {
}
