package com.mapbox.covoiturage.MAPBOX.Entity;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import lombok.*;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "trip")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Trip {

    @Id
    private String id;
    private Node source;
    private Node destination;
    private short maxNbPassanger;
    // private String carModel;
    private String startDate;
    private float price;
    private Boolean isOpen;


    //private List<List<Double>> Coordination;
    private List<Node> route;

    @DBRef
    private Driver driver;

    @DBRef
    private List<Passenger> pendingPassengers;
    // @DBRef
    // private List<Passenger> passenger;
}
