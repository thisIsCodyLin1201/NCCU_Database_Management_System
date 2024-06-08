package com.example.demo.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Locker_ID implements Serializable {
    // 複合主鍵
    @Column(name = "station_id")
    private Long station_id;

    @Column(name = "locker_id")
    private Long locker_id;

    public Locker_ID() {
    }

    public Locker_ID(Long station_id,  Long locker_id) {
        this.station_id = station_id;
        this.locker_id = locker_id;
    }

    // Getters, setters, hashCode and equals methods

    public Long getStationID(){
        return station_id;
    }

    public void setStationID(Long station_id){
        this.station_id = station_id;
    }

    public Long getLockerID(){
        return locker_id;
    }

    public void setLockerID(Long locker_id){
        this.locker_id = locker_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(station_id,  locker_id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Locker_ID that = (Locker_ID) obj;
        return Objects.equals(station_id, that.station_id) &&
              
               Objects.equals(locker_id, that.locker_id);
    }
}
