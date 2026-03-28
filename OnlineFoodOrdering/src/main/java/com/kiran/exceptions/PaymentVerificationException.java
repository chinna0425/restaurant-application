package com.kiran.exceptions;

public class PaymentVerificationException extends RuntimeException{
    public PaymentVerificationException(String msg) {
        super(msg);
    }
}
