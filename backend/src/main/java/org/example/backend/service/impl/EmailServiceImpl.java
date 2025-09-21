package org.example.backend.service.impl;

import org.example.backend.entity.Booking;
import org.example.backend.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    // Spring will auto-inject JavaMailSender bean from EmailConfig
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendBookingConfirmationEmail(Booking booking) {
        try {
            System.out.println("Sending confirmation email to: " + booking.getEmail());

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(booking.getEmail());
            message.setSubject("Booking Confirmed - Traveler (#" + booking.getId() + ")");
            message.setText(buildConfirmationMessage(booking));
            message.setFrom("sahanransika07@gmail.com");

            mailSender.send(message);
            System.out.println("Confirmation email sent successfully!");
        } catch (Exception e) {
            System.err.println("Failed to send confirmation email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void sendBookingCancellationEmail(Booking booking) {
        try {
            System.out.println("Sending cancellation email to: " + booking.getEmail());

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(booking.getEmail());
            message.setSubject("Booking Cancelled - Traveler (#" + booking.getId() + ")");
            message.setText(buildCancellationMessage(booking));
            message.setFrom("sahanransika07@gmail.com");

            mailSender.send(message);
            System.out.println("Cancellation email sent successfully!");
        } catch (Exception e) {
            System.err.println("Failed to send cancellation email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void testEmailConnection() {
        try {
            System.out.println("Testing email configuration...");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("sahanransika07@gmail.com");
            message.setSubject("Test - Traveler Email System");
            message.setText("Success! Your email configuration is working.\n\nTest time: " + new Date());
            message.setFrom("sahanransika07@gmail.com");

            mailSender.send(message);
            System.out.println("Test email sent successfully!");
        } catch (Exception e) {
            System.err.println("Email test failed: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Email test failed", e);
        }
    }

    // ----------------------- Helper Methods -----------------------

    private String buildConfirmationMessage(Booking booking) {
        return String.format(
                "Dear %s,\n\n" +
                        "Your booking has been confirmed!\n\n" +
                        "BOOKING DETAILS:\n" +
                        "Booking ID: #%d\n" +
                        "Service: %s\n" +
                        "Type: %s\n" +
                        "Check-in: %s\n" +
                        "Check-out: %s\n" +
                        "Guests: %d\n" +
                        "Total: $%.2f\n\n" +
                        "Thank you for choosing Traveler!\n\n" +
                        "Best regards,\n" +
                        "The Traveler Team",
                booking.getFullName(),
                booking.getId(),
                booking.getItemName(),
                booking.getBookingType().toUpperCase(),
                booking.getCheckIn(),
                booking.getCheckOut() != null ? booking.getCheckOut() : "N/A",
                booking.getGuests(),
                booking.getTotalPrice()
        );
    }

    private String buildCancellationMessage(Booking booking) {
        return String.format(
                "Dear %s,\n\n" +
                        "Your booking #%d has been cancelled.\n\n" +
                        "Service: %s\n" +
                        "Amount: $%.2f\n\n" +
                        "Refunds will be processed within 5-7 business days.\n\n" +
                        "Best regards,\n" +
                        "The Traveler Team",
                booking.getFullName(),
                booking.getId(),
                booking.getItemName(),
                booking.getTotalPrice()
        );
    }
}
