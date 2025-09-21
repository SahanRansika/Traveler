package org.example.backend.service.impl;

import org.example.backend.entity.Tour;
import org.example.backend.repository.TourRepository;
import org.example.backend.service.TourService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourServiceImpl implements TourService {
    private final TourRepository tourRepository;
    public TourServiceImpl(TourRepository tourRepository) { this.tourRepository = tourRepository; }
    @Override
    public Tour saveTour(Tour tour) { return tourRepository.save(tour); }
    @Override
    public List<Tour> getAllTours() { return tourRepository.findAll(); }
    @Override
    public Tour getTourById(Long id) { return tourRepository.findById(id).orElse(null); }
    @Override
    public void deleteTour(Long id) { tourRepository.deleteById(id); }
}
