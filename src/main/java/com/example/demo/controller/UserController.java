package com.example.demo.controller;

import com.example.demo.model.Locker_ID;
import com.example.demo.model.Reservation;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.context.SecurityContextHolder;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    private ReservationService reservationService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // @GetMapping("/currentUser")
    // public ResponseEntity<User> getCurrentUser(Principal principal) {
    //     String username = principal.getName();
    //     Optional<User> userOptional = userService.findByUsername(username);
    //     return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    // @GetMapping("/latestReservation")
    // public ResponseEntity<Reservation> getCurrentUserLatestReservation(Principal principal) {
    //     Long userId = getCurrentUserId(principal); // 从Principal获取用户ID
    //     if (userId != null) {
    //         Optional<Reservation> latestReservation = reservationService.getLatestReservationByUserId(userId);
    //         return latestReservation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // private Long getCurrentUserId(Principal principal) {
    //     // 通过Principal获取当前用户的详细信息
    //     String username = principal.getName();
    //     Optional<User> userOptional = userService.findByUsername(username);
    //     return userOptional.map(User::getUserID).orElse(null);
    // }

    //新增一個user
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("There is already a user registered with the provided username.",
                   HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        User createdUser = userService.createUser(user);

        return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            if (passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
                return new ResponseEntity<>(existingUser.get(), HttpStatus.OK);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password.");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(
            @RequestParam("email") String email,
            @RequestParam("currentPassword") String currentPassword,
            @RequestParam("newPassword") String newPassword) {
        if (email == null || currentPassword == null || newPassword == null) {
            return new ResponseEntity<>("Missing parameters", HttpStatus.BAD_REQUEST);
        }
        try{
            Optional<User> existingUser = userService.getUserByEmail(email);
            if (!existingUser.isPresent()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
            }

            User user = existingUser.get();
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password.");
            }

            // 更新密碼
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(user);

            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal server error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        SecurityContextHolder.getContext().setAuthentication(null);
        request.getSession().invalidate();
        return new ResponseEntity<>("User logged out successfully!", HttpStatus.OK);
    }

    
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @DeleteMapping("/deleteAccount")
    public ResponseEntity<?> deleteAccount(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            if (passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
                userService.deleteUser(existingUser.get());
                return new ResponseEntity<>(existingUser.get(), HttpStatus.OK);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password.");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
    }

}