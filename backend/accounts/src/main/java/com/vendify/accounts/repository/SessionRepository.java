package com.vendify.accounts.repository;

import com.vendify.accounts.model.*;
import com.vendify.accounts.model.analytics.*;
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
        AND session.last_activity >= date_trunc('day', NOW())
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
        AND last_activity >= NOW() - INTERVAL '10 minutes'
    """)
    Mono<Integer> getActiveUsers(String storeId);

    @Query("""
        SELECT
          CASE WHEN user_id IS NOT NULL THEN 'Logged-in' ELSE 'Non logged-in' END AS type,
          COUNT(*) AS count
        FROM session
        WHERE store_id = :storeId
          AND start_time >= NOW() - INTERVAL '24 hours'
        GROUP BY type
    """)
    Flux<SessionTypeRatio> getSessionLoginRatio(String storeId);


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
        WITH hours AS (
            SELECT generate_series(0, 23) AS hour
        )
        SELECT h.hour,
               COALESCE(AVG(EXTRACT(EPOCH FROM (s.last_activity - s.start_time))) / 60, 0) AS avg_minutes
        FROM hours h
        LEFT JOIN session s
          ON EXTRACT(HOUR FROM s.start_time) = h.hour
         AND s.store_id = :storeId
         AND s.start_time >= NOW() - INTERVAL '24 hours'
        GROUP BY h.hour
        ORDER BY h.hour
    """)
    Flux<AvgDurationPerHour> getAvgSessionDurationPerHour(String storeId);

    @Query("""
            SELECT split_part(action, ':', 2)::varchar AS product, COUNT(*) AS count
        FROM session, unnest(actions) AS action
        WHERE session.store_id = :storeId AND action LIKE 'view-product:%'
        GROUP BY product
        ORDER BY count DESC
        LIMIT 10
    """)
    Flux<ProductActionCount> getMostViewedProducts(String storeId);

    @Query("""
        SELECT split_part(action, ':', 2)::varchar AS product, COUNT(*) AS count
        FROM session, unnest(actions) AS action
        WHERE session.store_id = :storeId AND action LIKE 'add-to-cart:%'
        GROUP BY product
        ORDER BY count DESC
        LIMIT 10
    """)
    Flux<ProductActionCount> getMostAddedToCartProducts(String storeId);

    @Query("""
        SELECT split_part(action, ':', 2)::varchar AS product, COUNT(*) AS count
        FROM session, unnest(actions) AS action
        WHERE session.store_id = :storeId AND action LIKE 'add-to-wishlist:%'
        GROUP BY product
        ORDER BY count DESC
        LIMIT 10
    """)
    Flux<ProductActionCount> getMostWishlistedProducts(String storeId);

    @Query("""
        SELECT s.user_id,
               s.session_cookie,
               SUM(EXTRACT(EPOCH FROM (COALESCE(s.end_time, s.last_activity) - s.start_time)) / 60) AS total_minutes,
               (
                   SELECT page
                   FROM (
                       SELECT unnest(pages_visited) AS page
                       FROM session s2
                       WHERE s2.session_cookie = s.session_cookie AND s2.store_id = :storeId
                   ) AS page_data
                   GROUP BY page
                   ORDER BY COUNT(*) DESC
                   LIMIT 1
               ) AS favourite_page
        FROM session s
        WHERE s.store_id = :storeId
        GROUP BY s.user_id, s.session_cookie
        ORDER BY total_minutes DESC
        LIMIT 10
    """)
    Flux<ActiveUserStat> getTopUsersWithSessionAndFavoritePage(String storeId);


    @Query("""
        SELECT page, COUNT(*) AS hits
        FROM (
            SELECT unnest(pages_visited) AS page
            FROM session
            WHERE store_id = :storeId
        ) AS page_data
        GROUP BY page
        ORDER BY hits DESC
        LIMIT 10
    """)
    Flux<PageViewStat> getMostVisitedPages(String storeId);

}
