package com.mapbox.covoiturage.MAPBOX.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mapbox.covoiturage.MAPBOX.Entity.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    
}
