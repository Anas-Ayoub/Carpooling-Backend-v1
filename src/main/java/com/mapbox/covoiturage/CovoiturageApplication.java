package com.mapbox.covoiturage;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Entity.Passenger;
import com.mapbox.covoiturage.MAPBOX.Entity.Role;
import com.mapbox.covoiturage.MAPBOX.Entity.Trip;
import com.mapbox.covoiturage.MAPBOX.Entity.UserEntity;
import com.mapbox.covoiturage.MAPBOX.Repository.DriverRepository;
import com.mapbox.covoiturage.MAPBOX.Repository.NodeRepository;
import com.mapbox.covoiturage.MAPBOX.Repository.PassengerRepository;
import com.mapbox.covoiturage.MAPBOX.Repository.RoleRepository;
import com.mapbox.covoiturage.MAPBOX.Repository.TripRepo;
import com.mapbox.covoiturage.MAPBOX.Repository.UserRepository;

@SpringBootApplication
public class CovoiturageApplication implements CommandLineRunner {

	@Autowired
	private DriverRepository driverRep;

	@Autowired
	private PassengerRepository passengerRep;

	@Autowired
	private TripRepo tripRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private NodeRepository nodeRepo;
	public static void main(String[] args) {
		SpringApplication.run(CovoiturageApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Driver d = driverRep.save(new Driver(null,"name 1","email1","tel1"));

		Passenger p = passengerRep.save(new Passenger(null,"name 1","email 1","phone 1",List.of(12d)));

		Role r = roleRepo.save(new Role(null,"driver"));

		UserEntity u = userRepo.save(new UserEntity(null,"email","1234",List.of(r)));

		tripRepo.save(new Trip(null, null, null, "car 1", new Date(),null, d, List.of(p)));
	}

}
