package com.mapbox.covoiturage.MAPBOX.Repository;

import com.mapbox.covoiturage.MAPBOX.Entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity findByEmail(String email);
}