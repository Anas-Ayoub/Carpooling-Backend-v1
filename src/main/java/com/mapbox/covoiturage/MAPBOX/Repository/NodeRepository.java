package com.mapbox.covoiturage.MAPBOX.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mapbox.covoiturage.MAPBOX.Entity.Node;

public interface NodeRepository extends MongoRepository<Node, String> {
    
}
