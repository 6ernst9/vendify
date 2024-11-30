package com.vendify.accounts.repository;

import com.vendify.accounts.model.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    @Query("SELECT * FROM users WHERE store_id = :storeId AND username = :username")
    Mono<User> findUserByUsername(Long storeId, String username);

    @Query("SELECT * FROM users WHERE store_id = :storeId AND email = :email")
    Mono<User> findUserByEmail(Long storeId, String email);

    @Query("SELECT * FROM users WHERE store_id = :storeId AND phone_number = :phoneNumber")
    Mono<User> findUserByPhoneNumber(Long storeId, String phoneNumber);
}
