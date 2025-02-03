package com.serasome.poe2.database.entity;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String message;
    private final HttpStatus status;

    public ErrorResponse(HttpStatus status) {
        this.status = status;
        this.message = status.getReasonPhrase();
    }

    public ErrorResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public LocalDateTime getTimestampe() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}