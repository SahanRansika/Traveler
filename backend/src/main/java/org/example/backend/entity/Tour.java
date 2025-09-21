package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String destination;
    private String description;
    private Double price;
    private Integer durationDays;
    private String imageUrl;
}
