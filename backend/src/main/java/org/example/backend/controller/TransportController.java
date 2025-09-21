package org.example.backend.controller;

import org.example.backend.entity.Transport;
import org.example.backend.service.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transports")
@CrossOrigin(origins = "*")
public class TransportController {

    @Autowired
    private TransportService transportService;

    @GetMapping
    public ResponseEntity<List<Transport>> getAllTransports() {
        return ResponseEntity.ok(transportService.getAllTransports());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transport> getTransportById(@PathVariable Long id) {
        Transport transport = transportService.getTransportById(id);
        return transport != null ? ResponseEntity.ok(transport) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Transport> createTransport(@RequestBody Transport transport) {
        Transport savedTransport = transportService.saveTransport(transport);
        return ResponseEntity.ok(savedTransport);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transport> updateTransport(@PathVariable Long id, @RequestBody Transport transportDetails) {
        Transport transport = transportService.getTransportById(id);
        if (transport == null) {
            return ResponseEntity.notFound().build();
        }
        transport.setType(transportDetails.getType());
        transport.setProvider(transportDetails.getProvider());
        transport.setPrice(transportDetails.getPrice());
        transport.setDescription(transportDetails.getDescription());
        transport.setImageUrl(transportDetails.getImageUrl());
        return ResponseEntity.ok(transportService.saveTransport(transport));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransport(@PathVariable Long id) {
        if (transportService.getTransportById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        transportService.deleteTransport(id);
        return ResponseEntity.ok("Transport deleted successfully");
    }
}