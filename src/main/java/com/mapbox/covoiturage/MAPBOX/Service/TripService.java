package com.mapbox.covoiturage.MAPBOX.Service;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Entity.Trip;
import com.mapbox.covoiturage.MAPBOX.Repository.TripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {
    private final TripRepo tripRepository;
    
    @Autowired
    private DriverService driverService;

    @Autowired
    public TripService(TripRepo tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        System.out.println("in Service Layer");
        return tripRepository.findAll();
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public Optional<Trip> getTripById(String id) {
        return tripRepository.findById(id);
    }

    public Trip getPassengerById(String id) {
        return tripRepository.findById(id).orElse(null);
    }

    public Trip getTripByDriverUserId(String id){
        Driver driver = driverService.getDriverByUserId(id);
        return tripRepository.findByDriver(driver).getFirst();
    }
}
