package com.kiran.Service;

import com.kiran.entity.Order;
import com.kiran.responseDto.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
