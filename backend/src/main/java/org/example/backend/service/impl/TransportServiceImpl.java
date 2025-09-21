package org.example.backend.service.impl;

import org.example.backend.entity.Transport;
import org.example.backend.repository.TransportRepository;
import org.example.backend.service.TransportService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportServiceImpl implements TransportService {
    private final TransportRepository transportRepository;
    public TransportServiceImpl(TransportRepository transportRepository) { this.transportRepository = transportRepository; }
    @Override
    public Transport saveTransport(Transport transport) { return transportRepository.save(transport); }
    @Override
    public List<Transport> getAllTransports() { return transportRepository.findAll(); }
    @Override
    public Transport getTransportById(Long id) { return transportRepository.findById(id).orElse(null); }
    @Override
    public void deleteTransport(Long id) { transportRepository.deleteById(id); }
}
