package com.vendify.accounts.repository;

import com.vendify.accounts.model.Session;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SessionRepository extends ReactiveCrudRepository<Session, Long> {
    @Query("SELECT * FROM session WHERE refresh_token = :refreshToken")
    Mono<Session> findByRefreshToken(String refreshToken);
}
