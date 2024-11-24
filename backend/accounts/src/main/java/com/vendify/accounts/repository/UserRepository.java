package com.vendify.accounts.repository;

import com.vendify.accounts.model.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    @Query("SELECT * FROM users WHERE username = :username")
    Mono<User> findUserByUsername(String username);

    @Query("SELECT * FROM users WHERE email = :email")
    Mono<User> findUserByEmail(String email);

    @Query("SELECT * FROM users WHERE phone_number = :phoneNumber")
    Mono<User> findUserByPhoneNumber(String phoneNumber);
}
