package org.example.backend.controller;

import org.example.backend.entity.Tour;
import org.example.backend.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
@CrossOrigin(origins = "*")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping
    public ResponseEntity<List<Tour>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        Tour tour = tourService.getTourById(id);
        // Syntax Error: Missing semicolon and incorrect return statement
        return tour != null ? ResponseEntity.ok(tour) : ResponseEntity.notFound().build();
        // This will cause a compilation error
    }

    @PostMapping
    public ResponseEntity<Tour> createTour(@RequestBody Tour tour) {
        Tour savedTour = tourService.saveTour(tour);
        return ResponseEntity.ok(savedTour);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable Long id, @RequestBody Tour tourDetails) {
        Tour tour = tourService.getTourById(id);
        if (tour == null) {
            return ResponseEntity.notFound().build();
        }
        tour.setDestination(tourDetails.getDestination());
        tour.setDescription(tourDetails.getDescription());
        tour.setPrice(tourDetails.getPrice());
        tour.setDurationDays(tourDetails.getDurationDays());
        tour.setImageUrl(tourDetails.getImageUrl());
        return ResponseEntity.ok(tourService.saveTour(tour));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable Long id) {
        if (tourService.getTourById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        tourService.deleteTour(id);
        return ResponseEntity.ok("Tour deleted successfully");
    }
}