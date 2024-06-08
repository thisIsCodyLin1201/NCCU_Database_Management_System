package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "mrt_station")
public class MrtStation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "station_id")
    private Long stationID;

    @Column(name = "station_name", nullable = false)
    private String stationName;

    @Column(name = "mrt_station_location", nullable = false)
    private String mrtStationLocation;

    @OneToMany(mappedBy = "mrtStation")
    private List<Locker> lockers;
    
    public MrtStation(){
    }

    public MrtStation(Long stationID, String stationName, String mrtStationLocation){
        this.stationID = stationID;
        this.stationName = stationName;
        this.mrtStationLocation = mrtStationLocation;
    }

    public Long getStationID(){
        return stationID;
    }

    public void setStationID(Long stationID){
        this.stationID = stationID;
    }

    public String getStationName(){
        return stationName;
    }

    public void setStationName(String stationName){
        this.stationName = stationName;
    }

    public String getMrtStationLocation(){
        return mrtStationLocation;
    }

    public void setMrtStationLocation(String mrtStationLocation){
        this.mrtStationLocation = mrtStationLocation;
    }

    public List<Locker> getLockers() {
        return lockers;
    }

    public void setLockers(List<Locker> lockers) {
        this.lockers = lockers;
    }
}