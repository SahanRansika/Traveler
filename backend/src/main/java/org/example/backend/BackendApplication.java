package org.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "org.example.backend.controller",
        "org.example.backend.service",
        "org.example.backend.repository",
        "org.example.backend.config",
        "org.example.backend.security",
        "org.example.backend.util",
        "org.example.backend.exception"
})
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}