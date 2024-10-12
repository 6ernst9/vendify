package com.vendify.accounts.service;

import com.vendify.accounts.model.User;
import com.vendify.accounts.model.UserDto;
import com.vendify.accounts.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository userRepository;

    public Mono<User> getUserById(long id){
        return userRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    public Mono<User> getUserByUsername(String username){
        return userRepository.findUserByUsername(username)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    public Mono<User> getUserByEmail(String email){
        return userRepository.findUserByEmail(email)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    public Mono<User> getUserByPhoneNumber(String phoneNumber){
        return userRepository.findUserByPhoneNumber(phoneNumber)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    public Mono<User> addUser(UserDto userDto) {
        return userRepository.save(
                new User(
                        userDto.getUsername(),
                        userDto.getFirstName(),
                        userDto.getLastName(),
                        userDto.getAge(),
                        userDto.getEmail(),
                        userDto.getPassword(),
                        userDto.getPhoneNumber()
                ));
    }

    public Mono<User> updateAccount(User userToUpdate) {
        return userRepository.findById(userToUpdate.getId())
                .flatMap(account -> userRepository.save(userToUpdate))
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    public Mono<Void> deleteAccount(@NonNull Long id){
        return userRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")))
                .flatMap(account -> userRepository.deleteById(id));
    }
}
