package com.vendify.accounts.repository;

import com.vendify.accounts.model.AvgDurationPerHour;
import com.vendify.accounts.model.Session;
import com.vendify.accounts.model.SessionCountPerHour;
import com.vendify.accounts.model.UserTotalSessionTime;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Repository
public interface SessionRepository extends ReactiveCrudRepository<Session, Long> {
    @Query("SELECT * FROM session WHERE refresh_token = :refreshToken")
    Mono<Session> findByRefreshToken(String refreshToken);

    @Query("SELECT * FROM session WHERE session_cookie = $1 ORDER BY end_time DESC LIMIT 1")
    Mono<Session> findLatestByUser(String sessionId);

    @Query("""
        WITH hours AS (
            SELECT generate_series(0, 23) AS hour
        )
        SELECT h.hour,
               COUNT(s.id) AS session_count
        FROM hours h
        LEFT JOIN session s
          ON EXTRACT(HOUR FROM s.start_time) = h.hour
         AND s.store_id = :storeId
         AND s.start_time >= NOW() - INTERVAL '24 hours'
        GROUP BY h.hour
        ORDER BY h.hour
    """)
    Flux<SessionCountPerHour> getSessionCountPerHour(String storeId);

    @Query("""
        SELECT COUNT(*) 
        FROM session 
        WHERE store_id = :storeId 
          AND start_time >= date_trunc('day', NOW())
    """)
    Mono<Integer> getTotalSessionsToday(String storeId);

    @Query("""
        SELECT AVG(EXTRACT(EPOCH FROM (session.last_activity - session.start_time))) AS avg_duration
        FROM session
        WHERE store_id = :storeId
    """)
    Mono<Double> getAverageSessionDuration(String storeId);

    @Query("""
        SELECT COUNT(*) 
        FROM session 
        WHERE store_id = :storeId 
          AND last_activity >= NOW() - INTERVAL ':minutes minutes'
    """)
    Mono<Integer> getActiveUsers(String storeId, int minutes);

    @Query("""
        SELECT COUNT(*) 
        FROM (
            SELECT session_cookie 
            FROM session 
            WHERE store_id = :storeId
            GROUP BY session_cookie 
            HAVING COUNT(*) > 1
        ) AS returning_users
    """)
    Mono<Integer> getReturningUserCount(String storeId);

    @Query("""
        SELECT COUNT(DISTINCT session_cookie)
        FROM session
        WHERE store_id = :storeId
    """)
    Mono<Integer> getTotalUserCount(String storeId);

    @Query("""
        SELECT session_cookie, SUM(EXTRACT(EPOCH FROM (session.last_activity - session.start_time))) AS total_time
        FROM session
        WHERE store_id = :storeId
        GROUP BY session_cookie
        ORDER BY total_time DESC
        LIMIT 10
    """)
    Flux<UserTotalSessionTime> getTopUsersByTotalTime(String storeId);

    @Query("""
        SELECT date_trunc('hour', start_time) AS hour,
               AVG(EXTRACT(EPOCH FROM (session.last_activity - session.start_time))) AS avg_duration
        FROM session
        WHERE store_id = :storeId AND session.start_time >= NOW() - INTERVAL '24 HOURS'
        GROUP BY hour
        ORDER BY hour
    """)
    Flux<AvgDurationPerHour> getHourlyAvgSessionDuration(String storeId);
}
