package com.mapbox.covoiturage.MAPBOX.Repository;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository extends MongoRepository<Driver, String> {
    Driver findByUserId(String userId);
}
