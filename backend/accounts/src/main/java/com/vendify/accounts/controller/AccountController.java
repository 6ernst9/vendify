package com.vendify.accounts.controller;

import com.vendify.accounts.model.ResponseDto;
import com.vendify.accounts.service.AccountService;
import com.vendify.accounts.model.User;
import com.vendify.accounts.model.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/get-user-by-id/{id}")
    public Mono<User> getUserById(@PathVariable long id){
        log.info("Performing GET /get-user-by-id call. Input: id={}", id);
        var user = accountService.getUserById(id);
        log.info("Performed GET /user call. Input: id={}. Output={}", id, user);
        return user;
    }

    @GetMapping("/get-user-by-username/{username}")
    public Mono<User> getUserByUsername(@PathVariable String username){
        log.info("Performing GET /get-user-by-username call. Input: username={}", username);
        var user = accountService.getUserByUsername(username);
        log.info("Performed GET /get-user-by-username call. Input: username={}. Output={}", username, user);
        return user;
    }

    @GetMapping("/get-user-by-email/{email}")
    public Mono<User> getUserByEmail(@PathVariable String email){
        log.info("Performing GET /get-user-by-email call. Input: email={}", email);
        var user = accountService.getUserByEmail(email);
        log.info("Performed GET /get-user-by-email call. Input: email={}. Output={}", email, user);
        return user;
    }

    @GetMapping("/get-user-by-phone-number/{phone}")
    public Mono<User> getUserByPhoneNumber(@PathVariable String phone){
        log.info("Performing GET /get-user-by-phone-number call. Input: phone-number={}", phone);
        var user = accountService.getUserByPhoneNumber(phone);
        log.info("Performed GET /get-user-by-phone-number call. Input: phone-number={}. Output={}", phone, user);
        return user;
    }

    @PostMapping("/add-user")
    public Mono<ResponseDto> addUser(@RequestBody UserDto user){
        log.info("Performing POST /add-user call. Input: user={}", user);
        return accountService.addUser(user).flatMap(account -> {
            log.info("Performed POST /add-user call. Input: user={}", account);
            return Mono.just(new ResponseDto("user_created", "User created successfully."));
        });
    }

    @PutMapping("/update-user")
    public Mono<ResponseDto> updateUser(@RequestBody User user){
        log.info("Performing UPDATE /update-user call. Input: user={}", user);
        return accountService.updateAccount(user).flatMap(account -> {
            log.info("Performed UPDATE /update-user call. Input: user={}", account);
            return Mono.just(new ResponseDto("user_updated", "User updated successfully."));
        });
    }

    @DeleteMapping("/delete-user/{id}")
    public Mono<ResponseDto> deleteUser(@PathVariable long id){
        log.info("Performing DELETE /delete-user call. Input: id={}", id);
        return accountService.deleteAccount(id).then(Mono.defer(() -> {
            log.info("Performed DELETE /delete-user call. Input: id={}", id);
            return Mono.just(new ResponseDto("user_deleted", "User deleted successfully."));
        }));
    }
}
