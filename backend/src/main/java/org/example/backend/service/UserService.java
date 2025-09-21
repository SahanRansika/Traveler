package org.example.backend.service;

import org.example.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    Optional<User> login(String email, String password); // Keep for backward compatibility if needed
    Optional<User> findByEmail(String email); // New method for JWT authentication
}