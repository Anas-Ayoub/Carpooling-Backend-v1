package com.mapbox.covoiturage.MAPBOX.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
public class UserEntity {

    @Id
    private String id;
    private String email;
    private String password;
    private String role;

}