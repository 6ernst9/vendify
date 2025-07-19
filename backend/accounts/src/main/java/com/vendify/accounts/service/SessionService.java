package com.vendify.accounts.service;

import com.vendify.accounts.model.analytics.*;
import com.vendify.accounts.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;

    public Flux<SessionCountPerHour> getSessionCountPerHour(String storeId) {
        return sessionRepository.getSessionCountPerHour(storeId);
    }

    public Mono<Integer> getTotalSessionsToday(String storeId) {
        return sessionRepository.getTotalSessionsToday(storeId);
    }

    public Flux<SessionTypeRatio> getSessionTypeRatio(String storeId) {
        return sessionRepository.getSessionLoginRatio(storeId);
    }

    public Flux<Double> getQuickKPIs(String storeId) {
        var totalSessions = sessionRepository.getTotalSessionsToday(storeId);
        var avgDuration = sessionRepository.getAverageSessionDuration(storeId);
        var activeUsers = sessionRepository.getActiveUsers(storeId);
        var returningUsers = sessionRepository.getReturningUserCount(storeId);
        var totalUsers = sessionRepository.getTotalUserCount(storeId);

        return Mono.zip(totalSessions, avgDuration, returningUsers, totalUsers, activeUsers)
                .flatMapMany(tuple -> {
                    var sessionsToday = (double) tuple.getT1();
                    var avgDurationSec = tuple.getT2();
                    var returning = tuple.getT3();
                    int total = tuple.getT4();
                    var active = (double) tuple.getT5();

                    var returnRate = (total > 0) ? (100.0 * returning / total) : 0.0;
                    return Flux.just(sessionsToday, avgDurationSec, returnRate, active);
                });
    }

    public Mono<Double> getAverageSessionDuration(String storeId) {
        return sessionRepository.getAverageSessionDuration(storeId);
    }

    public Flux<UserTotalSessionTime> getTopUsersByTotalTime(String storeId) {
        return sessionRepository.getTopUsersByTotalTime(storeId);
    }

    public Flux<AvgDurationPerHour> getAvgDurationPerHour(String storeId) {
        return sessionRepository.getAvgSessionDurationPerHour(storeId);
    }

    public Flux<ProductActionCount> getMostViewedProducts(String storeId) {
        return sessionRepository.getMostViewedProducts(storeId);
    }

    public Flux<ProductActionCount> getMostAddedToCartProducts(String storeId) {
        return sessionRepository.getMostAddedToCartProducts(storeId);
    }

    public Flux<ProductActionCount> getMostWishlistedProducts(String storeId) {
        return sessionRepository.getMostWishlistedProducts(storeId);
    }

    public Flux<ActiveUserStat> getMostActiveUsers(String storeId) {
        return sessionRepository.getTopUsersWithSessionAndFavoritePage(storeId);
    }

    public Flux<PageViewStat> getMostVisitedPages(String storeId) {
        return sessionRepository.getMostVisitedPages(storeId);
    }
}
