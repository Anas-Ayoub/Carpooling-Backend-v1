package com.mapbox.covoiturage.MAPBOX.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nonapi.io.github.classgraph.json.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "node")
public class Node {
    @Id
    private String id;
    private Double x;
    private Double y;
}
