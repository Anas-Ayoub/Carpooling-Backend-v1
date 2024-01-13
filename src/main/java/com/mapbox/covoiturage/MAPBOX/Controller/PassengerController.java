package com.mapbox.covoiturage.MAPBOX.Controller;

import com.mapbox.covoiturage.MAPBOX.Entity.Passenger;
import com.mapbox.covoiturage.MAPBOX.Service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/passengers")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    @GetMapping("/getAll")
    public List<Passenger> getAllPassengers() {
        return passengerService.getAllPassagers();
    }

    @GetMapping("/{id}")
    public Passenger getPassengerById(@PathVariable String id) {
        return passengerService.getPassagerById(id);
    }

    @GetMapping("/users/{id}")
    public Passenger getPassengerByUserId(@PathVariable String id) {
        return passengerService.getPassengerByUserId(id);
    }

    @PostMapping("/savePassenger")
    public Passenger createPassenger(@RequestBody Passenger passenger) {
        return passengerService.createPassager(passenger);
    }

    @DeleteMapping("/{id}")
    public void deletePassenger(@PathVariable String id) {
        passengerService.deletePassager(id);
    }

    @GetMapping("/test")
    public String TEST() {
        return "test passenger";
    }
}
