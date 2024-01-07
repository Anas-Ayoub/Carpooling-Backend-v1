package com.mapbox.covoiturage.MAPBOX.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "driver")
public class Driver {
    @Id
    private String id;
    private String username;
    private String email;
    private String phone;

    @DBRef
    private UserEntity user;
}
