package com.vendify.accounts.model;

import java.time.LocalDateTime;

public record SessionCountPerHour(Integer hour, Long sessionCount) {
}
