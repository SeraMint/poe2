package com.serasome.poe2.database.global;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(NoResourceFoundException.class)
    public String handleGenericException(NoResourceFoundException ex) {
        return "forward:/";
    }
}