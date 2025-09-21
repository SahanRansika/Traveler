package org.example.backend.service.impl;

import org.example.backend.entity.Hotel;
import org.example.backend.repository.HotelRepository;
import org.example.backend.service.HotelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {
    private final HotelRepository hotelRepository;
    public HotelServiceImpl(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    @Override
    public Hotel saveHotel(Hotel hotel) { return hotelRepository.save(hotel); }
    @Override
    public List<Hotel> getAllHotels() { return hotelRepository.findAll(); }
    @Override
    public Hotel getHotelById(Long id) { return hotelRepository.findById(id).orElse(null); }
    @Override
    public void deleteHotel(Long id) { hotelRepository.deleteById(id); }
}
