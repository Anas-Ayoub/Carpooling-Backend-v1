package com.mapbox.covoiturage.MAPBOX;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserCredentials {
    private String email;
    private String password;
}