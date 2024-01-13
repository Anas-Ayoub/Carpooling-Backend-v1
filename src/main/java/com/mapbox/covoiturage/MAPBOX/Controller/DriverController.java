package com.mapbox.covoiturage.MAPBOX.Controller;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/")
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable String id) {
        System.out.println(id);
        return driverService.getDriverById(id);
    }

    @GetMapping("/users/{id}")
    public Driver getDriverByUserId(@PathVariable String id) {
        return driverService.getDriverByUserId(id);
    }

    @PostMapping("/saveDriver")
    public Driver createDriver(@RequestBody Driver driver) {
        return driverService.createDriver(driver);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteDriver(@PathVariable String id) {
        driverService.deleteDriver(id);
    }

    @GetMapping("/test")
    public String TEST() {
        return "test driver";
    }
}
