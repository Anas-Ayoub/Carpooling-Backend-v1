package com.mapbox.covoiturage.MAPBOX.Controller;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Entity.Passenger;
import com.mapbox.covoiturage.MAPBOX.Entity.Trip;
import com.mapbox.covoiturage.MAPBOX.Service.DriverService;
import com.mapbox.covoiturage.MAPBOX.Service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trips")
public class TripController {
    private final TripService tripService;

    @Autowired
    DriverService driverService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/")
    public List<Trip>getAllTrips() {
        // System.out.println("in GetMapping");
        return tripService.getAllTrips();
    }

    @GetMapping("/login")
    public ResponseEntity<String> get() {
        String message = "In Spring BOOT BACK END";
        return ResponseEntity.ok().body("{\"message\": \"" + message + "\"}");
    }

    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable String id) {
        return tripService.getPassengerById(id);
    }

    @GetMapping("/drivers/users/{id}")
    public Trip getTripByDriverUserId(@PathVariable String id) {
        return tripService.getTripByDriverUserId(id);
    }

    @PostMapping("/")
    public Trip createTrip(
        @RequestBody Trip trip,
        @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {


        Driver d = driverService.getDriverByUserId(authorizationHeader);

        trip.setDriver(d);
        return tripService.createTrip(trip);
    }

    @PutMapping("/updateTrip")
    public ResponseEntity<Trip> updateTripe(@RequestBody Trip trip)
    {
        // Optional<Trip> optionalTrip = tripService.getTripById(trip.getId());
        // if (optionalTrip.isPresent())
        // {
        //     Trip existingTrip = optionalTrip.get(); // Kanjibo Trip li deja kayna
        //     existingTrip.setRoute(trip.getRoute());
        //     existingTrip.setPassenger(trip.getPassenger());

        //     return new ResponseEntity<>(tripService.createTrip(existingTrip), HttpStatus.OK);
        // }
        // else
        // {
        //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // }
        return null;
    }

}
