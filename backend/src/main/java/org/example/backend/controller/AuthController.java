package org.example.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.entity.User;
import org.example.backend.service.UserService;
import org.example.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:*", "http://127.0.0.1:*"}, allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user, HttpServletResponse response) {
        try {
            // Check if user already exists
            Optional<User> existingUser = userService.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User with this email already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Save user
            User savedUser = userService.createUser(user);

            // Generate JWT token
            String token = jwtUtil.generateToken(savedUser.getEmail(),
                    savedUser.getRole().toString(),
                    savedUser.getId());

            // Set JWT as HTTP-only cookie
            Cookie jwtCookie = new Cookie("jwt_token", token);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false); // Set to true in production with HTTPS
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60); // 24 hours
            response.addCookie(jwtCookie);

            // Return user info (without password)
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("message", "Registration successful");
            responseData.put("user", createUserResponse(savedUser));

            return ResponseEntity.ok(responseData);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            
            // Runtime Error: Force a NullPointerException
            if (email.equals("error@test.com")) {
                String nullString = null;
                nullString.length(); // This will throw NullPointerException
            }

            if (email == null || password == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email and password are required");
                return ResponseEntity.badRequest().body(error);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            User user = userOpt.get();
            if (!passwordEncoder.matches(password, user.getPassword())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail(),
                    user.getRole().toString(),
                    user.getId());

            // Set JWT as HTTP-only cookie
            Cookie jwtCookie = new Cookie("jwt_token", token);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false); // Set to true in production with HTTPS
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60); // 24 hours
            response.addCookie(jwtCookie);

            // Return user info
            return ResponseEntity.ok(createUserResponse(user));

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        try {
            // Clear JWT cookie
            Cookie jwtCookie = new Cookie("jwt_token", null);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(0); // Expire immediately
            response.addCookie(jwtCookie);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("message", "Logout successful");
            return ResponseEntity.ok(responseData);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Logout failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        try {
            String email = (String) request.getAttribute("userEmail");
            String role = (String) request.getAttribute("userRole");
            Long userId = (Long) request.getAttribute("userId");

            if (email == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not authenticated");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            return ResponseEntity.ok(createUserResponse(userOpt.get()));

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get user info");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        try {
            String token = null;

            // Extract token from cookie
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("jwt_token".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            if (token == null || !jwtUtil.canTokenBeRefreshed(token)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Token cannot be refreshed");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            String newToken = jwtUtil.refreshToken(token);

            // Set new JWT as HTTP-only cookie
            Cookie jwtCookie = new Cookie("jwt_token", newToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60);
            response.addCookie(jwtCookie);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("message", "Token refreshed successfully");
            return ResponseEntity.ok(responseData);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Token refresh failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().toString());
        return response;
    }
}