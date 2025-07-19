package com.vendify.accounts.service;

import com.vendify.accounts.config.IdpProperties;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtGenerator implements Serializable {
    private final IdpProperties idpProperties;

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Long getSessionFromToken(String token) {
        return getAllClaimsFromAccessToken(token).get("sessionId", Long.class);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        var claims = getAllClaimsFromAccessToken(token);
        return claimsResolver.apply(claims);
    }

    public Claims getAllClaimsFromAccessToken(String token) {
        return Jwts.parser()
                .setSigningKey(idpProperties.getSecrets().access())
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean validateRefreshToken(String token) {
        var claims = Jwts.parser()
                .setSigningKey(idpProperties.getSecrets().refresh())
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration().before(new Date());
    }

    private Boolean isTokenExpired(String token) {
        var expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateAccessToken(String email, Long sessionId) {
        var claims = new HashMap<String, Object>();
        claims.put("sessionId", sessionId);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + idpProperties.getValidity().accessToken().toMillis()))
                .signWith(SignatureAlgorithm.HS512, idpProperties.getSecrets().access()).compact();
    }

    public String generateRefreshToken() {
        var claims = new HashMap<String, Object>();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + idpProperties.getValidity().refreshToken().toMillis()))
                .signWith(SignatureAlgorithm.HS512, idpProperties.getSecrets().refresh()).compact();
    }

    public Boolean validateToken(String token) {
        var email = getUsernameFromToken(token);
        var sessionId = getSessionFromToken(token);

        return (!email.isEmpty() && sessionId != null && !isTokenExpired(token));
    }
}