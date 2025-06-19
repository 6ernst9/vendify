package com.vendify.accounts.service;

import com.vendify.accounts.exceptions.UserNotFoundException;
import com.vendify.accounts.model.User;
import com.vendify.accounts.model.UserDto;
import com.vendify.accounts.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository userRepository;

    public Mono<User> getUserById(long id){
        return userRepository.findById(id);
    }

    public Mono<User> getUserByEmail(String storeId, String email){
        return userRepository.findUserByEmail(storeId, email);
    }

    public Flux<User> getUsersByStore(String storeId){
        return userRepository.findUsersByStore(storeId);
    }

    public Mono<User> getUserByPhoneNumber(String storeId, String phoneNumber){
        return userRepository.findUserByPhoneNumber(storeId, phoneNumber);
    }

    public Mono<User> addUser(UserDto userDto) {
        return userRepository.save(
                new User(
                        userDto.getFirstName(),
                        userDto.getLastName(),
                        userDto.getEmail(),
                        userDto.getPassword(),
                        userDto.getPhoneNumber(),
                        userDto.getStoreId()
                ));
    }

    public Mono<User> updateAccount(User userToUpdate) {
        return userRepository.findById(userToUpdate.getId())
                .flatMap(account -> userRepository.save(userToUpdate))
                .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for id " + userToUpdate.getId())));
    }

    public Mono<Void> deleteAccount(@NonNull Long id){
        return userRepository.findById(id)
                .switchIfEmpty(Mono.error(new UserNotFoundException("User not found", "User not found for id " + id)))
                .flatMap(account -> userRepository.deleteById(id));
    }
}
