package com.mapbox.covoiturage.MAPBOX.Service;

import com.mapbox.covoiturage.MAPBOX.Entity.UserEntity;
import com.mapbox.covoiturage.MAPBOX.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity authenticateUser(UserEntity user) {
        UserEntity usr = userRepository.findByEmailAndPassword(user.getEmail(),user.getPassword());
        
        return usr;
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }
}