package com.mapbox.covoiturage.MAPBOX.Controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.mapbox.covoiturage.MAPBOX.Entity.Driver;
import com.mapbox.covoiturage.MAPBOX.Entity.Passenger;
import com.mapbox.covoiturage.MAPBOX.Repository.PassengerRepository;
import com.mapbox.covoiturage.MAPBOX.Service.DriverService;
import com.mapbox.covoiturage.MAPBOX.Service.PassengerService;
import com.mapbox.covoiturage.MAPBOX.Service.TripService;

@Controller
public class WebSocketController {

    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PassengerService passengerService;
    private TripService tripService;

    private ConcurrentHashMap<String, String> userSocketSessionMap;
    
    @Autowired
    public WebSocketController(SimpMessagingTemplate messagingTemplate,ConcurrentHashMap<String, String> userSocketSessionMap){
        this.messagingTemplate = messagingTemplate;
        this.userSocketSessionMap = userSocketSessionMap;
    }

    @MessageMapping("/trip/request")//what passenger sendto ( /app/passenger )
    @SendTo("/driver/request")// what driver subsrivbe
    public String sendMessage(String message,SimpMessageHeaderAccessor headerAccessor) {
        String userId = (String)headerAccessor.getFirstNativeHeader("userId");

        String tripId = (String)headerAccessor.getFirstNativeHeader("tripId");


        Passenger p = passengerService.getPassengerByUserId(userId);


        // tripService.addPassengerToPendingList(tripId,p);
        
        
        
        messagingTemplate.convertAndSend("/topic/driver/request",p.getId());

        return "sucess !!";

        // return "passenger end point you said : " + message;
    }

    @MessageMapping("/passenger/request")//what driver sent to ( /driver/passenger )
    @SendTo("/passenger/approve")//what passenger subscribe
    public String showPassangers(String driverId) {
        
        
        messagingTemplate.convertAndSend("/topic/passenger/approve","approved" );

        return "You said: nothing ";
    }

}
