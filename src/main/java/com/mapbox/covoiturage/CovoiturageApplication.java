package com.mapbox.covoiturage;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Entity.Node;
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

		Role r = roleRepo.save(new Role(null,"driver"));
		Role r2 = roleRepo.save(new Role(null,"passanger"));

		UserEntity u = userRepo.save(new UserEntity(null,"email","1234",List.of(r)));

		UserEntity u2 = userRepo.save(new UserEntity(null,"email2","12345",List.of(r2)));

		Driver d = driverRep.save(new Driver(null,"name 1","email1","tel1",u));

		// Driver d2 = driverRep.save(new Driver(null,"name 2","email2","tel2",u2));


		Passenger p = passengerRep.save(new Passenger(null,"name 1","email 1","phone 1",new Node(12d,21d,""),u2));


		// // tripRepo.save(new Trip(null, n, n, "car 1", new Date(),List.of(n), d, List.of(p)));

		// tripRepo.save(new Trip(null, new Node(12d,21d,""), new Node(12d,21d,""), (short)5, new Date().toString(),13.5f,true, List.of(),d));

		// tripRepo.save(new Trip(null, new Node(12d,21d,""), new Node(12d,21d,""), (short)7, new Date().toString(),13.5f,true, List.of(),d2));
	}

}
