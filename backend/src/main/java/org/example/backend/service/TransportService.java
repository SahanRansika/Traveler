package org.example.backend.service;

import org.example.backend.entity.Transport;

import java.util.List;

public interface TransportService {
    Transport saveTransport(Transport transport);
    List<Transport> getAllTransports();
    Transport getTransportById(Long id);
    void deleteTransport(Long id);
}
