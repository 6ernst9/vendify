package com.vendify.accounts.model.analytics;

import java.time.LocalDateTime;

public record AvgDurationPerHour(Integer hour, Double avgMinutes) {
}
