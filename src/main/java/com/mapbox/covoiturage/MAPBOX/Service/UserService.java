package com.mapbox.covoiturage.MAPBOX.Service;

import com.mapbox.covoiturage.MAPBOX.Entity.UserEntity;
import com.mapbox.covoiturage.MAPBOX.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticateUser(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }
}