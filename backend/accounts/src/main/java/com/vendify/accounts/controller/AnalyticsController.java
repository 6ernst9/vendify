package com.vendify.accounts.controller;

import com.vendify.accounts.model.SessionCountPerHour;
import com.vendify.accounts.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final SessionService sessionService;

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
        log.info("Performing GET /et-quick-kpis. Input: storeId={}", storeId);
        var kpis = sessionService.getQuickKPIs(storeId);
        log.info("Performed GET /et-quick-kpis. Input: storeId={}, kpis={}", storeId, kpis);
        return kpis;
    }
}
