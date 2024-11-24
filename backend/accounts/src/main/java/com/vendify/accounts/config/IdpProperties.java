package com.vendify.accounts.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Data
@Configuration
@ConfigurationProperties(prefix="idp")
public class IdpProperties {
    private Validity validity;
    private Secrets secrets;

    public record Validity(Duration accessToken, Duration refreshToken) {
    }

    public record Secrets(String access, String refresh) {
    }
}


