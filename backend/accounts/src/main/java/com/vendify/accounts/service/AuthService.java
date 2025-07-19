package com.vendify.accounts.service;

import com.vendify.accounts.config.StoreLogger;
import com.vendify.accounts.exceptions.InvalidCredentials;
import com.vendify.accounts.exceptions.UserConflictException;
import com.vendify.accounts.exceptions.UserNotFoundException;
import com.vendify.accounts.model.LoginResponse;
import com.vendify.accounts.model.Session;
import com.vendify.accounts.model.User;
import com.vendify.accounts.model.UserDto;
import com.vendify.accounts.repository.SessionRepository;
import com.vendify.accounts.util.UserActivityMapper;
import com.vendify.accounts.util.ValidationUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AccountService accountService;
    private final SessionRepository sessionRepository;
    private final JwtGenerator jwtGenerator;

    public Mono<LoginResponse> login(String storeId, String sessionId, String placeHolder, String password) {
        Mono<User> userMono;
        if(ValidationUtils.isEmail(placeHolder)) {
            userMono = accountService.getUserByEmail(storeId, placeHolder)
                    .switchIfEmpty(Mono.error(new UserNotFoundException("Invalid email or phone number", "User not found for email " + placeHolder)));
        } else {
            userMono = accountService.getUserByPhoneNumber(storeId, placeHolder)
                    .switchIfEmpty(Mono.error(new UserNotFoundException("Invalid email or phone number", "Invalid phone number " + placeHolder)));
        }

        return userMono.flatMap(user -> {
            if(!user.getPassword().equals(password)) {
                log.error("Incorrect password for user {}", user.getId());
                return Mono.error(new InvalidCredentials("Incorrect password", "Account's password doesn't match"));
            }

            if(!user.getStoreId().equals(storeId)) {
                log.error("Invalid storeId for user {}", user.getId());
                return Mono.error(new UserNotFoundException("User not found", "User not found for email " + placeHolder));
            }

            return sessionRepository.findLatestByUser(sessionId).flatMap(session -> {
                var accessToken = jwtGenerator.generateAccessToken(user.getEmail(), session.getId());
                var refreshToken = jwtGenerator.generateRefreshToken();

                session.setAccessToken(accessToken);
                session.setRefreshToken(refreshToken);
                session.setUserId(user.getId());
                return sessionRepository.save(session).then(Mono.just(new LoginResponse(user.getId(), accessToken, refreshToken)));
            }).switchIfEmpty(sessionRepository.save(new Session(user.getId(), storeId, sessionId, "", "")).flatMap(session -> {
                var accessToken = jwtGenerator.generateAccessToken(user.getEmail(), session.getId());
                var refreshToken = jwtGenerator.generateRefreshToken();

                session.setAccessToken(accessToken);
                session.setRefreshToken(refreshToken);
                return sessionRepository.save(session).then(Mono.just(new LoginResponse(user.getId(), accessToken, refreshToken)));
            }));
        });
    }

    public Mono<LoginResponse> register(String sessionId, UserDto userDto) {
        var emailUser = accountService.getUserByEmail(userDto.getStoreId(), userDto.getEmail());
        var phoneNumberUser = accountService.getUserByPhoneNumber(userDto.getStoreId(), userDto.getPhoneNumber());

        return emailUser.flatMap(user -> {
            if(user != null){
                return Mono.error(new UserConflictException("Invalid email", "User with email already exists"));
            }
            return Mono.empty();
        }).then(phoneNumberUser.flatMap(user -> {
            if(user != null){
                return Mono.error(new UserConflictException("Invalid phone number", "User with phone number already exists"));
            }
            return Mono.empty();
        })).then(accountService.addUser(userDto)
                .flatMap(user -> sessionRepository.save(new Session(user.getId(), user.getStoreId(), sessionId, "", "")).flatMap(session -> {
            var accessToken = jwtGenerator.generateAccessToken(user.getEmail(), session.getId());
            var refreshToken = jwtGenerator.generateRefreshToken();

            session.setAccessToken(accessToken);
            session.setRefreshToken(refreshToken);
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

    public Mono<Void> updateActivity(String sessionId, String store, String path, String action) {
        return sessionRepository.findLatestByUser(sessionId).flatMap(session -> {
            var log = UserActivityMapper.toAdminLog(session.getUserId(), path, action);
            StoreLogger.log(session.getStoreId(), log);

            if(session.getLastActivity().isAfter(LocalDateTime.now().minusMinutes(30))) {
                session.setLastActivity(LocalDateTime.now());
                var pages = session.getPagesVisited();
                pages.add(path);
                var actions = session.getActions();
                actions.add(action);
                session.setPagesVisited(pages);
                session.setActions(actions);
                return sessionRepository.save(session);
            } else {
                session.setEndTime(session.getLastActivity());
                return sessionRepository.save(session)
                        .then(sessionRepository.save(new Session(store, sessionId, List.of(path), List.of(action))));
            }
        }).switchIfEmpty(Mono.defer(() -> {
            var session = new Session(store, sessionId, List.of(path), List.of(action));

            var log = UserActivityMapper.toAdminLog(session.getUserId(), path, action);
            StoreLogger.log(session.getStoreId(), log);

            return sessionRepository.save(session);
        })).then(Mono.empty());
    }

    public Mono<Void> logout(String sessionId) {
        return sessionRepository.findLatestByUser(sessionId).flatMap(session -> {
            session.setEndTime(LocalDateTime.now());
            session.setLastActivity(LocalDateTime.now());
            return sessionRepository.save(session).then(Mono.empty());
        });
    }
}
