package org.example.backend.repository;

import org.example.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByEmailOrderByCreatedAtDesc(String email);
    List<Booking> findByStatus(String status);

    @Query("SELECT b FROM Booking b WHERE b.email = :email AND b.status = :status ORDER BY b.createdAt DESC")
    List<Booking> findByEmailAndStatus(@Param("email") String email, @Param("status") String status);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = :status")
    long countByStatus(@Param("status") String status);
}