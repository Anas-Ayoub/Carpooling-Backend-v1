package com.mapbox.covoiturage.MAPBOX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mapbox")
public class RouteController {
    @GetMapping
    public String demo()
    {
        return "index";
    }
}
