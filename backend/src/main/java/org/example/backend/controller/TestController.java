package org.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = {"http://localhost:*", "http://127.0.0.1:*"}, allowCredentials = "true")
public class TestController {

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint");
        return response;
    }

    @GetMapping("/protected")
    public Map<String, Object> protectedEndpoint(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a protected endpoint");
        response.put("userEmail", request.getAttribute("userEmail"));
        response.put("userRole", request.getAttribute("userRole"));
        response.put("userId", request.getAttribute("userId"));
        return response;
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> adminEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is an admin-only endpoint");
        return response;
    }
}