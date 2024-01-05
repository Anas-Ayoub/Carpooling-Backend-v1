package com.mapbox.covoiturage.MAPBOX.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Node {
    private Double x;
    private Double y;
    private String label;
}
