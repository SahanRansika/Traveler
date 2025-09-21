package org.example.backend.service;

import org.example.backend.entity.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking save(Booking booking);
    List<Booking> findAll();
    Optional<Booking> findById(Long id);
    List<Booking> findByUserEmail(String email);
    List<Booking> findByStatus(String status);
}