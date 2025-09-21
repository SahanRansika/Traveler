package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type; // Car, Bus, Flight, Train
    private String provider;
    private Double price;
    private String description;
    private String imageUrl;
}