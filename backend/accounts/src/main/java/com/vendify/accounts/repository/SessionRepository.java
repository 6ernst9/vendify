package com.vendify.accounts.repository;

import com.vendify.accounts.model.Session;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends ReactiveCrudRepository<Session, Long> {
}
