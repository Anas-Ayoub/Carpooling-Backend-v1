package com.mapbox.covoiturage.MAPBOX.Service;

import com.mapbox.covoiturage.MAPBOX.Entity.Passenger;
import com.mapbox.covoiturage.MAPBOX.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {
    @Autowired
    private PassengerRepository passengerRepository;

    public List<Passenger> getAllPassagers() {
        return passengerRepository.findAll();
    }

    public Passenger getPassagerById(String id) {
        return passengerRepository.findById(id).orElse(null);
    }

    public Passenger getPassengerByUserId(String id) {
        return passengerRepository.findByUserId(id);
    }

    

    public Passenger createPassager(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    public void deletePassager(String id) {
        passengerRepository.deleteById(id);
    }
}
