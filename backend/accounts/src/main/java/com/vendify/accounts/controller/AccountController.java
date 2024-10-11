package com.vendify.accounts.controller;

import com.vendify.accounts.model.User;
import com.vendify.accounts.model.UserDto;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1")
public class AccountController {
    @GetMapping("/user")
    public Mono<User> getUserById(long id){
        return Mono.empty();
    }

    @PostMapping("/user")
    public void addUser(@RequestBody UserDto user){

    }

    @PutMapping("/user")
    public void updateUser(@RequestBody UserDto user){
    }

    @DeleteMapping("/user")
    public void deleteUser(@RequestBody UserDto user){
    }
}
