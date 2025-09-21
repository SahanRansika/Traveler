package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "check_in", nullable = false)
    private String checkIn;

    @Column(name = "check_out")
    private String checkOut;

    @Column(name = "guests", nullable = false)
    private Integer guests;

    @Column(name = "booking_type", nullable = false)
    private String bookingType;

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    @Column(name = "status", nullable = false)
    private String status;


}