package com.quiambao.mypetstore.web;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    // Hardcoded admin credentials (demo only — never do this in production)
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123";

    public record LoginRequest(String username, String password) {}

    @PostMapping("/admin/login")
    public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody LoginRequest request) {
        if (ADMIN_USERNAME.equals(request.username()) && ADMIN_PASSWORD.equals(request.password())) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "role", "ADMIN",
                "token", "mock-admin-token-" + System.currentTimeMillis(),
                "message", "Welcome back, Admin!"
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
            "success", false,
            "message", "Invalid username or password."
        ));
    }

    @PostMapping("/customer/login")
    public ResponseEntity<Map<String, Object>> customerLogin(@RequestBody LoginRequest request) {
        // Mock: any non-empty email/pass is accepted (replace with real DB check later)
        if (request.username() != null && !request.username().isBlank()
                && request.password() != null && !request.password().isBlank()) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "role", "CUSTOMER",
                "token", "mock-customer-token-" + System.currentTimeMillis(),
                "message", "Login successful!"
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
            "success", false,
            "message", "Invalid credentials."
        ));
    }

    @PostMapping("/customer/register")
    public ResponseEntity<Map<String, Object>> customerRegister(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String name = body.get("name");
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email and password are required."));
        }
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Account created! Welcome, " + (name != null ? name : email) + "!"
        ));
    }
}
