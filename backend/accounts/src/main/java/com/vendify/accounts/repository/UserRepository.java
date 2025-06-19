package com.vendify.accounts.repository;

import com.vendify.accounts.model.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    @Query("SELECT * FROM users WHERE store_id = :storeId AND email = :email")
    Mono<User> findUserByEmail(String storeId, String email);

    @Query("SELECT * FROM users WHERE store_id = :storeId")
    Flux<User> findUsersByStore(String storeId);

    @Query("SELECT * FROM users WHERE store_id = :storeId AND phone_number = :phoneNumber")
    Mono<User> findUserByPhoneNumber(String storeId, String phoneNumber);
}
