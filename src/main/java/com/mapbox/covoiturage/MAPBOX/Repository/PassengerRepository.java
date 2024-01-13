package com.mapbox.covoiturage.MAPBOX.Repository;

import com.mapbox.covoiturage.MAPBOX.Entity.Passenger;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface PassengerRepository extends MongoRepository<Passenger, String> {
    Passenger findByUserId(String userId);
}
