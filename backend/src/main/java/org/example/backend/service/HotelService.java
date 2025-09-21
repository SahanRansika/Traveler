package org.example.backend.service;

import org.example.backend.entity.Hotel;

import java.util.List;

public interface HotelService {
    Hotel saveHotel(Hotel hotel);
    List<Hotel> getAllHotels();
    Hotel getHotelById(Long id);
    void deleteHotel(Long id);
}