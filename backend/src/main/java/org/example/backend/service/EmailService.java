package org.example.backend.service;

import org.example.backend.entity.Booking;

public interface EmailService {
    void sendBookingConfirmationEmail(Booking booking);
    void sendBookingCancellationEmail(Booking booking);
}