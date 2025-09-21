package org.example.backend.service.impl;

import org.example.backend.entity.Booking;
import org.example.backend.repository.BookingRepository;
import org.example.backend.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Booking save(Booking booking) {
        LocalDate now = LocalDate.now();

        if (booking.getCreatedAt() == null) {
            booking.setCreatedAt(now);
        }
        booking.setUpdatedAt(now);  // 👈 always refresh

        if (booking.getStatus() == null) {
            booking.setStatus("PENDING");
        }

        return bookingRepository.save(booking);
    }


    @Override
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return bookingRepository.findById(id);
    }

    @Override
    public List<Booking> findByUserEmail(String email) {
        return bookingRepository.findByEmailOrderByCreatedAtDesc(email);
    }
    @Override
    public List<Booking> findByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }
}