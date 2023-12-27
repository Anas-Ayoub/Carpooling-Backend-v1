package com.mapbox.covoiturage.MAPBOX.Controller;

import com.mapbox.covoiturage.MAPBOX.Entity.UserEntity;
import com.mapbox.covoiturage.MAPBOX.Service.UserService;
import com.mapbox.covoiturage.MAPBOX.UserCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String authenticateUser(@RequestBody UserCredentials credentials) {
        String email = credentials.getEmail();
        String password = credentials.getPassword();

        boolean isAuthenticated = userService.authenticateUser(email, password);
        System.out.println(isAuthenticated);
        if (isAuthenticated) {
            return "{\"message\": \"User found.\"}";
        } else {
            return "{\"message\": \"User not found or incorrect credentials.\"}";
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {
        UserEntity createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
