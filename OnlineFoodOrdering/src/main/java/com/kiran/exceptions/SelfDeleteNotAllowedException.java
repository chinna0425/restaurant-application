package com.kiran.exceptions;

public class SelfDeleteNotAllowedException extends RuntimeException {

    public SelfDeleteNotAllowedException(String message) {
        super(message);
    }
}