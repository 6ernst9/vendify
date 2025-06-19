package com.vendify.accounts.controller;

import com.vendify.accounts.config.annotations.WMTSecurityMapping;
import com.vendify.accounts.exceptions.UserNotFoundException;
import com.vendify.accounts.model.ResponseDto;
import com.vendify.accounts.service.AccountService;
import com.vendify.accounts.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/get-user-by-id/{id}")
    @WMTSecurityMapping(path = "get-user-by-id")
    public Mono<User> getUserById(@PathVariable long id){
        log.info("Performing GET /get-user-by-id call. Input: id={}", id);
        var user = accountService.getUserById(id)
                .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for id " + id)));
        log.info("Performed GET /get-user-by-id call. Input: id={}. Output={}", id, user);
        return user;
    }

    @GetMapping("/get-user-by-email/{storeId}/{email}")
    @WMTSecurityMapping(path = "get-user-by-email")
    public Mono<User> getUserByEmail(@PathVariable String storeId,
                                     @PathVariable String email){
        log.info("Performing GET /get-user-by-email call. Input: email={}", email);
        var user = accountService.getUserByEmail(storeId, email)
                .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for email " + email)));
        log.info("Performed GET /get-user-by-email call. Input: email={}. Output={}", email, user);
        return user;
    }

    @GetMapping("/get-user-by-phone-number/{storeId}/{phone}")
    @WMTSecurityMapping(path = "get-user-by-phone")
    public Mono<User> getUserByPhoneNumber(@PathVariable String storeId,
                                           @PathVariable String phone){
        log.info("Performing GET /get-user-by-phone-number call. Input: phone-number={}", phone);
        var user = accountService.getUserByPhoneNumber(storeId, phone)
                .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for phone number " + phone)));
        log.info("Performed GET /get-user-by-phone-number call. Input: phone-number={}. Output={}", phone, user);
        return user;
    }

    @GetMapping("/get-users-by-store/{storeId}")
    @WMTSecurityMapping(path = "get-users-by-store")
    public Flux<User> getUsersByStore(@PathVariable String storeId){
        log.info("Performing GET /get-users-by-store call. Input: store={}", storeId);
        var users = accountService.getUsersByStore(storeId);
        log.info("Performed GET /get-users-by-store call. Input: store={}. Output={}", storeId, users);
        return users;
    }

    @PutMapping("/update-user")
    @WMTSecurityMapping(path = "update-user")
    public Mono<ResponseDto> updateUser(@RequestBody User user){
        log.info("Performing UPDATE /update-user call. Input: user={}", user);
        return accountService.updateAccount(user).flatMap(account -> {
            log.info("Performed UPDATE /update-user call. Input: user={}", account);
            return Mono.just(new ResponseDto("user_updated", "User updated successfully."));
        });
    }

    @DeleteMapping("/delete-user/{id}")
    @WMTSecurityMapping(path = "delete-user")
    public Mono<ResponseDto> deleteUser(@PathVariable long id){
        log.info("Performing DELETE /delete-user call. Input: id={}", id);
        return accountService.deleteAccount(id).then(Mono.defer(() -> {
            log.info("Performed DELETE /delete-user call. Input: id={}", id);
            return Mono.just(new ResponseDto("user_deleted", "User deleted successfully."));
        }));
    }
}
