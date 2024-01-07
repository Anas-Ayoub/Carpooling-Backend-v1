package com.mapbox.covoiturage.MAPBOX.Repository;


import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Entity.Trip;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepo extends MongoRepository<Trip, String> {
    List<Trip> findByDriver(Driver driver);
}
