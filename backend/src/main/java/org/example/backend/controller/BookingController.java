package org.example.backend.controller;

import org.example.backend.entity.Booking;
import org.example.backend.service.BookingService;
import org.example.backend.service.EmailService;
import org.example.backend.service.impl.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings(
            @RequestParam(value = "userEmail", required = false) String userEmail) {
        if (userEmail != null && !userEmail.isEmpty()) {
            return ResponseEntity.ok(bookingService.findByUserEmail(userEmail));
        }
        return ResponseEntity.ok(bookingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Booking>> searchBookings(
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "bookingType", required = false) String bookingType) {
        if (email != null && !email.isEmpty()) {
            return ResponseEntity.ok(bookingService.findByUserEmail(email));
        }

        List<Booking> bookings = bookingService.findAll();
        if (status != null && !status.isEmpty()) {
            bookings = bookings.stream()
                    .filter(booking -> booking.getStatus().equalsIgnoreCase(status))
                    .toList();
        }
        if (bookingType != null && !bookingType.isEmpty()) {
            bookings = bookings.stream()
                    .filter(booking -> booking.getBookingType().equalsIgnoreCase(bookingType))
                    .toList();
        }
        return ResponseEntity.ok(bookings);
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        // Set timestamps
        if (booking.getCreatedAt() == null) {
            booking.setCreatedAt(LocalDate.now());
        }
        booking.setUpdatedAt(LocalDate.now());

        // Set default status if not provided
        if (booking.getStatus() == null) {
            booking.setStatus("CART");
        }

        Booking savedBooking = bookingService.save(booking);

        // Send confirmation email if booking is confirmed
        if ("CONFIRMED".equalsIgnoreCase(savedBooking.getStatus())) {
            emailService.sendBookingConfirmationEmail(savedBooking);
        }

        return ResponseEntity.ok(savedBooking);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        return bookingService.findById(id)
                .map(booking -> {
                    String oldStatus = booking.getStatus();
                    String newStatus = statusUpdate.get("status");

                    booking.setStatus(newStatus);
                    booking.setUpdatedAt(LocalDate.now());
                    Booking updatedBooking = bookingService.save(booking);

                    // Send email notifications based on status change
                    if ("CONFIRMED".equalsIgnoreCase(newStatus) && !"CONFIRMED".equalsIgnoreCase(oldStatus)) {
                        emailService.sendBookingConfirmationEmail(updatedBooking);
                    } else if ("CANCELLED".equalsIgnoreCase(newStatus)) {
                        emailService.sendBookingCancellationEmail(updatedBooking);
                    }

                    return ResponseEntity.ok(updatedBooking);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(
            @PathVariable Long id,
            @RequestParam(value = "userEmail", required = false) String userEmail) {

        return bookingService.findById(id)
                .map(booking -> {
                    // Verify user owns this booking if userEmail is provided
                    if (userEmail != null && !userEmail.equals(booking.getEmail())) {
                        return ResponseEntity.status(403).body("Not authorized to cancel this booking");
                    }

                    booking.setStatus("CANCELLED");
                    booking.setUpdatedAt(LocalDate.now());
                    bookingService.save(booking);

                    // Send cancellation email
                    emailService.sendBookingCancellationEmail(booking);

                    return ResponseEntity.ok("Booking cancelled successfully");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/cart")
    public ResponseEntity<List<Booking>> getCartBookings(
            @RequestParam(value = "userEmail", required = false) String userEmail) {
        if (userEmail != null && !userEmail.isEmpty()) {
            List<Booking> userCartBookings = bookingService.findByUserEmail(userEmail)
                    .stream()
                    .filter(booking -> "CART".equalsIgnoreCase(booking.getStatus()))
                    .toList();
            return ResponseEntity.ok(userCartBookings);
        }

        List<Booking> cartBookings = bookingService.findByStatus("CART");
        return ResponseEntity.ok(cartBookings);
    }

    // New endpoint specifically for payment confirmation
    @PostMapping("/{id}/confirm-payment")
    public ResponseEntity<Booking> confirmPayment(@PathVariable Long id, @RequestBody Map<String, Object> paymentDetails) {
        return bookingService.findById(id)
                .map(booking -> {
                    booking.setStatus("CONFIRMED");
                    booking.setUpdatedAt(LocalDate.now());
                    Booking confirmedBooking = bookingService.save(booking);

                    // Send confirmation email
                    emailService.sendBookingConfirmationEmail(confirmedBooking);

                    return ResponseEntity.ok(confirmedBooking);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/test-email")
    public ResponseEntity<String> testEmailConfiguration() {
        try {
            if (emailService instanceof EmailServiceImpl) {
                ((EmailServiceImpl) emailService).testEmailConnection();
                return ResponseEntity.ok("Test email sent! Check your inbox.");
            }
            return ResponseEntity.status(500).body("Cannot access test method");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Email test failed: " + e.getMessage());
        }
    }
}