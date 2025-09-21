package org.example.backend.service;

import org.example.backend.entity.Tour;

import java.util.List;

public interface TourService {
    Tour saveTour(Tour tour);
    List<Tour> getAllTours();
    Tour getTourById(Long id);
    void deleteTour(Long id);
}
