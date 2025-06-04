package com.vendify.accounts.config;

import com.vendify.accounts.config.annotations.WMTSecurityMapping;
import com.vendify.accounts.service.JwtGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import com.vendify.accounts.exceptions.SecurityException;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class SecurityAspect {
    private final JwtGenerator jwtGenerator;

    @Before("@annotation(mapping)")
    public void securityFilterChain(WMTSecurityMapping mapping){
        var request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        var requestMapping = request.getHeader("X-FI-V-PATH");
        var siteId = request.getHeader("X-FI-V-SITE-ID");
        var device = request.getHeader("X-FI-V-DEVICE");
        var ipAddress = request.getHeader("X-FI-V-IP");

        if(requestMapping == null){
            throw new SecurityException("Path not found", "Request should contain path mapping");
        }
        if(siteId == null){
            throw new SecurityException("Site ID not found", "Request should contain site id");
        }
        if(device == null){
            throw new SecurityException("Device not found", "Request should contain device");
        }
        if(ipAddress == null){
            throw new SecurityException("IP Address not found", "Request should contain ip address");
        }

        if(!requestMapping.contains(mapping.path())){
            throw new SecurityException("Invalid path", "Request should contain endpoint path");
        }

        var tokenEnabled = mapping.tokenEnabled();
        if(!tokenEnabled){
            log.info("Skipping authorizations check for request");
            return;
        }

        var authorization = request.getHeader("Authorization");
        if (authorization == null) {
            throw new SecurityException("Authorization not found", "Authorization header is required");
        }
        if(!authorization.startsWith("Bearer")) {
            throw new SecurityException("Invalid authorization", "Authorization should start with 'Bearer'");
        }
        var token = authorization.substring(7);

        if(!jwtGenerator.validateToken(token)) {
            throw new SecurityException("Invalid token", "Token not matching claims");
        }
    }
}
