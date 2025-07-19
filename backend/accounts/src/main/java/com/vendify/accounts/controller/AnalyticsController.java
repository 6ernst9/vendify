package com.vendify.accounts.controller;

import com.vendify.accounts.model.analytics.*;
import com.vendify.accounts.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import static com.vendify.accounts.config.StoreLogger.LOG_DIR;

@Slf4j
@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final SessionService sessionService;

    @GetMapping("/logs/{storeId}")
    public ResponseEntity<?> getLogsForStore(@PathVariable String storeId) {
        var filePath = LOG_DIR + "/store-" + storeId + ".log";
        var file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No logs found for store: " + storeId);
        }

        try {
            List<String> lines = Files.readAllLines(file.toPath());
            return ResponseEntity.ok(lines);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading logs: " + e.getMessage());
        }
    }

    @GetMapping("/get-sessions-per-hour/{storeId}")
    public Flux<SessionCountPerHour> getSessionCountPerHour(@PathVariable String storeId) {
        log.info("Performing GET /get-sessions-per-hour. Input: storeId={}", storeId);
        var sessionCount = sessionService.getSessionCountPerHour(storeId);
        log.info("Performed GET /get-sessions-per-hour. Input: storeId={}, sessionCount={}", storeId, sessionCount);
        return sessionCount;
    }

    @GetMapping("/get-sessions-today/{storeId}")
    public Mono<Integer> getTotalSessionsToday(@PathVariable String storeId) {
        log.info("Performing GET /get-sessions-today. Input: storeId={}", storeId);
        var sessionCount = sessionService.getTotalSessionsToday(storeId);
        log.info("Performed GET /get-sessions-today. Input: storeId={}, sessionCount={}", storeId, sessionCount);
        return sessionCount;
    }

    @GetMapping("/get-quick-kpis/{storeId}")
    public Flux<Double> getQuickKPIs(@PathVariable String storeId) {
        log.info("Performing GET /get-quick-kpis. Input: storeId={}", storeId);
        var kpis = sessionService.getQuickKPIs(storeId);
        log.info("Performed GET /get-quick-kpis. Input: storeId={}, kpis={}", storeId, kpis);
        return kpis;
    }

    @GetMapping("/get-session-ratio/{storeId}")
    public Flux<SessionTypeRatio> getSessionRatio(@PathVariable String storeId) {
        log.info("Performing GET /get-session-ratio. Input: storeId={}", storeId);
        var sessionRatio = sessionService.getSessionTypeRatio(storeId);
        log.info("Performed GET /get-session-ratio. Input: storeId={}, sessionRatio={}", storeId, sessionRatio);
        return sessionRatio;
    }

    @GetMapping("/get-avg-duration/{storeId}")
    public Flux<AvgDurationPerHour> getAvgDuration(@PathVariable String storeId) {
        log.info("Performing GET /get-avg-duration. Input: storeId={}", storeId);
        var avgDuration = sessionService.getAvgDurationPerHour(storeId);
        log.info("Performed GET /get-avg-duration. Input: storeId={}, avgDuration={}", storeId, avgDuration);
        return avgDuration;
    }

    @GetMapping("/get-most-viewed-products/{storeId}")
    public Flux<ProductActionCount> getMostViewedProducts(@PathVariable String storeId) {
        log.info("Performing GET /get-most-viewed-products. Input: storeId={}", storeId);
        var products = sessionService.getMostViewedProducts(storeId);
        log.info("Performed GET /get-most-viewed-products. Input: storeId={}, products={}", storeId, products);
        return products;
    }

    @GetMapping("/get-most-added-to-cart-products/{storeId}")
    public Flux<ProductActionCount> getMostAddedToCart(@PathVariable String storeId) {
        log.info("Performing GET /get-most-added-to-cart-products. Input: storeId={}", storeId);
        var products = sessionService.getMostAddedToCartProducts(storeId);
        log.info("Performed GET /get-most-added-to-cart-products. Input: storeId={}, products={}", storeId, products);
        return products;
    }

    @GetMapping("/get-most-added-to-wishlist-products/{storeId}")
    public Flux<ProductActionCount> getMostWishlisted(@PathVariable String storeId) {
        log.info("Performing GET /get-most-added-to-wishlist-products. Input: storeId={}", storeId);
        var products = sessionService.getMostWishlistedProducts(storeId);
        log.info("Performed GET /get-most-added-to-wishlist-products. Input: storeId={}, products={}", storeId, products);
        return products;
    }

    @GetMapping("/get-most-active-users/{storeId}")
    public Flux<ActiveUserStat> getMostActiveUsers(@PathVariable String storeId) {
        log.info("Performing GET /get-most-active-users. Input: storeId={}", storeId);
        var users = sessionService.getMostActiveUsers(storeId);
        log.info("Performed GET /get-most-active-users. Input: storeId={}, users={}", storeId, users);
        return users;
    }

    @GetMapping("/get-most-visited-pages/{storeId}")
    public Flux<PageViewStat> getMostVisitedPages(@PathVariable String storeId) {
        log.info("Performing GET /get-most-visited-pages. Input: storeId={}", storeId);
        var pages = sessionService.getMostVisitedPages(storeId);
        log.info("Performed GET /get-most-visited-pages. Input: storeId={}, users={}", storeId, pages);
        return pages;
    }
}
