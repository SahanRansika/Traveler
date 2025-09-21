package org.example.backend.service.impl;

import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        // Password encoding is now handled in the controller for registration
        // But we can also handle it here as a backup
        if (!isPasswordEncoded(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(userDetails.getUsername());
                    user.setEmail(userDetails.getEmail());

                    // Only encode password if it's being changed and not already encoded
                    if (userDetails.getPassword() != null &&
                            !userDetails.getPassword().isEmpty() &&
                            !isPasswordEncoded(userDetails.getPassword())) {
                        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }

                    user.setRole(userDetails.getRole());
                    return userRepository.save(user);
                }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> login(String email, String password) {
        // This method is deprecated in favor of JWT authentication
        // but kept for backward compatibility
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Helper method to check if password is already encoded
    private boolean isPasswordEncoded(String password) {
        // BCrypt hashes are always 60 characters long and start with $2a$, $2b$, or $2y$
        return password != null &&
                password.length() == 60 &&
                (password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$"));
    }
}