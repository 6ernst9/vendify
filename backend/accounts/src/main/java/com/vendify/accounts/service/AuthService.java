package com.vendify.accounts.service;

import com.vendify.accounts.exceptions.InvalidCredentials;
import com.vendify.accounts.exceptions.UserConflictException;
import com.vendify.accounts.exceptions.UserNotFoundException;
import com.vendify.accounts.model.LoginResponse;
import com.vendify.accounts.model.Session;
import com.vendify.accounts.model.User;
import com.vendify.accounts.model.UserDto;
import com.vendify.accounts.repository.SessionRepository;
import com.vendify.accounts.util.ValidationUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AccountService accountService;
    private final SessionRepository sessionRepository;
    private final JwtGenerator jwtGenerator;

    public Mono<LoginResponse> login(String storeId, String placeHolder, String password) {
        Mono<User> userMono;
        if(ValidationUtils.isEmail(placeHolder)) {
            userMono = accountService.getUserByEmail(storeId, placeHolder)
                    .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for email " + placeHolder)));
        } else if(ValidationUtils.isPhoneNumber(placeHolder)) {
            userMono = accountService.getUserByPhoneNumber(storeId, placeHolder);
        } else {
            userMono = accountService.getUserByUsername(storeId, placeHolder)
                    .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for username " + placeHolder)));
        }

        return userMono.flatMap(user -> {
            if(!user.getPassword().equals(password)) {
                log.error("Invalid password for user {}", user.getId());
                return Mono.error(new InvalidCredentials("Invalid password", "Account's password doesn't match"));
            }

            return sessionRepository.save(new Session(user.getId(), "", "")).flatMap(session -> {
                var accessToken = jwtGenerator.generateAccessToken(user.getUsername(), session.getId());
                var refreshToken = jwtGenerator.generateRefreshToken();

                session.setAccessToken(accessToken);
                return sessionRepository.save(session).then(Mono.just(new LoginResponse(user.getId(), accessToken, refreshToken)));
            });
        });
    }

    public Mono<LoginResponse> register(UserDto userDto) {
        var emailUser = accountService.getUserByEmail(userDto.getStoreId(), userDto.getEmail());
        var usernameUser = accountService.getUserByUsername(userDto.getStoreId(), userDto.getUsername());
        var phoneNumberUser = accountService.getUserByPhoneNumber(userDto.getStoreId(), userDto.getPhoneNumber());

        return emailUser.flatMap(user -> {
            if(user != null){
                return Mono.error(new UserConflictException("Invalid email", "User with email already exists"));
            }
            return Mono.empty();
        }).then(usernameUser.flatMap(user -> {
            if(user != null){
                return Mono.error(new UserConflictException("Invalid username", "User with username already exists"));
            }
            return Mono.empty();
        })).then(phoneNumberUser.flatMap(user -> {
            if(user != null){
                return Mono.error(new UserConflictException("Invalid phone number", "User with phone number already exists"));
            }
            return Mono.empty();
        })).then(accountService.addUser(userDto).flatMap(user -> sessionRepository.save(new Session(user.getId(), "", "")).flatMap(session -> {
            var accessToken = jwtGenerator.generateAccessToken(user.getUsername(), session.getId());
            var refreshToken = jwtGenerator.generateRefreshToken();

            session.setAccessToken(accessToken);
            return sessionRepository.save(session).then(Mono.just(new LoginResponse(user.getId(), accessToken, refreshToken)));
        })));
    }

    public Mono<String> refreshToken(String refreshToken) {
        if(!jwtGenerator.validateRefreshToken(refreshToken)){
            log.error("Invalid refresh token");
            throw new RuntimeException("Invalid refresh token");
        }

        return sessionRepository.findByRefreshToken(refreshToken).flatMap(session -> {
            var accessToken = session.getAccessToken();
            var claims = jwtGenerator.getAllClaimsFromAccessToken(accessToken);

            var username = claims.getSubject();
            var sessionId = claims.get("sessionId", Long.class);

            return Mono.just(jwtGenerator.generateAccessToken(username, sessionId));
        });
    }

    public Mono<Claims> introspect(String accessToken) {
        return Mono.just(jwtGenerator.getAllClaimsFromAccessToken(accessToken));
    }

    public Mono<Void> logout(String accessToken) {
        var claims = jwtGenerator.getAllClaimsFromAccessToken(accessToken);
        var sessionId = claims.get("sessionId", Long.class);

        return sessionRepository.deleteById(sessionId).then(Mono.empty());
    }
}
