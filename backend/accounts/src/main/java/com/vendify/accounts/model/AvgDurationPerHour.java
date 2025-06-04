package com.vendify.accounts.model;

import java.time.LocalDateTime;

public record AvgDurationPerHour(LocalDateTime hour, Double avgDuration) {
}
