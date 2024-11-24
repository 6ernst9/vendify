package com.vendify.accounts.config;

import com.vendify.accounts.config.annotations.WMTSecurityMapping;
import com.vendify.accounts.repository.SessionRepository;
import com.vendify.accounts.service.JwtGenerator;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

@Aspect
@Component
@RequiredArgsConstructor
public class SecurityAspect {
    private final JwtGenerator jwtGenerator;
    private final SessionRepository sessionRepository;

    @Before("@annotation(mapping)")
    public void securityFilterChain(WMTSecurityMapping mapping){
        var request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        var requestMapping = request.getHeader("X-FI-V-PATH");
        var siteId = request.getHeader("X-FI-V-SITE-ID");
        var device = request.getHeader("X-FI-V-DEVICE");
        var ipAddress = request.getHeader("X-FI-V-IP");

        Assert.notNull(requestMapping, "path cannot be null");
        Assert.notNull(siteId, "siteId cannot be null");
        Assert.notNull(device, "device cannot be null");
        Assert.notNull(ipAddress, "ipAddress cannot be null");

        if(!requestMapping.contains(mapping.path())){
            throw new SecurityException("Invalid request mapping");
        }

        var tokenEnabled = mapping.tokenEnabled();
        if(!tokenEnabled){
            return;
        }

        var authorization = request.getHeader("Authorization");
        Assert.notNull(authorization, "authorization cannot be null");

        if(!authorization.startsWith("Bearer")) {
            throw new SecurityException("Invalid authorization");
        }
        var token = authorization.substring(7);

        if(!jwtGenerator.validateToken(token)) {
            throw new SecurityException("Invalid token");
        }

        var sessionId = jwtGenerator.getSessionFromToken(token);
        sessionRepository.findById(sessionId).flatMap(session -> {
            session.setLastActivity(LocalDateTime.now());
            return sessionRepository.save(session);
        });
    }
}
