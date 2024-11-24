package com.vendify.accounts.controller;

import com.vendify.accounts.config.annotations.WMTSecurityMapping;
import com.vendify.accounts.model.LoginDto;
import com.vendify.accounts.model.LoginResponse;
import com.vendify.accounts.model.ResponseDto;
import com.vendify.accounts.model.UserDto;
import com.vendify.accounts.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    @WMTSecurityMapping(path = "login", tokenEnabled = false)
    public Mono<LoginResponse> login(@RequestBody LoginDto loginDto) {
        var placeholder = loginDto.placeholder();
        var password = loginDto.password();
        log.info("Performing POST /login request. Input: placeholder={}, password={}", placeholder, password);

        return authService.login(placeholder, password).map(response -> {
            log.info("Performed POST /login request. Input: placeholder={}, password={}. Output: id={}", placeholder, password, response.id());
            return response;
        });
    }

    @PostMapping("/register")
    @WMTSecurityMapping(path = "register", tokenEnabled = false)
    public Mono<LoginResponse> register(@RequestBody UserDto userDto) {
        log.info("Performing POST /register request. Input: user={}", userDto);

        return authService.register(userDto).map(response -> {
            log.info("Performed POST /register request. Input: user={}. Output: id={}", userDto, response.id());
            return response;
        });
    }

    @PostMapping("/refresh")
    @WMTSecurityMapping(path = "refresh", tokenEnabled = false)
    public Mono<String> refreshToken(@RequestBody String refreshToken) {
        log.info("Performing POST /refresh request.");

        return authService.refreshToken(refreshToken).map(response -> {
            log.info("Performed POST /refresh request.");
            return response;
        });
    }

    @PostMapping("/logout")
    @WMTSecurityMapping(path = "logout", tokenEnabled = false)
    public Mono<ResponseDto> logout(@RequestBody String accessToken) {
        log.info("Performing POST /logout request");

        return authService.logout(accessToken).then(Mono.defer(() -> {
            log.info("Performed POST /logout request");
            return Mono.just(new ResponseDto("logout_successful", "User logged out successfully"));
        }));
    }
}
