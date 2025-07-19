package com.vendify.accounts.controller.advice;

import com.vendify.accounts.exceptions.*;
import com.vendify.accounts.exceptions.SecurityException;
import com.vendify.accounts.model.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@ControllerAdvice(annotations = RestController.class)
public class GlobalExceptionHandler {
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ResponseDto> handleSecurity(SecurityException exception) {
        log.error(exception.getMessage());
        return handleUnauthorizedRequest(exception);
    }
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ResponseDto> handleUserNotFound(UserNotFoundException exception) {
        log.error(exception.getDescription());
        return handleBadRequest(exception);
    }
    
    @ExceptionHandler(InvalidCredentials.class)
    public ResponseEntity<ResponseDto> handleInvalidCredentials(InvalidCredentials exception) {
        log.error(exception.getDescription());
        return handleUnauthorizedRequest(exception);
    }

    @ExceptionHandler(UserConflictException.class)
    public ResponseEntity<ResponseDto> handleUsedCredentials(UserConflictException exception) {
        log.error(exception.getDescription());
        return handleBadRequest(exception);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto> handleInternalServerError(Exception exception) {
        log.error(exception.getMessage());
        return new ResponseEntity<>(new ResponseDto("Internal Server Error", exception.getMessage()), HttpStatusCode.valueOf(500));
    }
    
    private ResponseEntity<ResponseDto> handleBadRequest(GenericException exception) {
        return new ResponseEntity<>(new ResponseDto(exception.getMessage(), exception.getDescription()), HttpStatusCode.valueOf(400));
    }
    
    private ResponseEntity<ResponseDto> handleUnauthorizedRequest(GenericException exception) {
        return new ResponseEntity<>(new ResponseDto(exception.getMessage(), exception.getDescription()), HttpStatusCode.valueOf(401));
    }
}
