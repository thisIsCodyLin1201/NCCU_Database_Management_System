package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;
import java.time.LocalTime;

@Entity
@Table(name = "hotel")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "hotel_id")
    private Long hotelID;

    @Column(name = "hotel_name", nullable = false, length = 255)
    private String hotelName;

    @Column(name = "latest_pick_up_time", nullable = false)
    private LocalTime latestPickUpTime;

    // @Column(name = "booking_id", nullable = false)
    // private int bookingID;

    @OneToMany(mappedBy = "hotel", cascade =  CascadeType.ALL/*java*/) 
    private List<Reservation> reservations;

    // @OneToMany(mappedBy = "hotels"/*java*/)
    // private List<User> users;

    public Hotel(){
    }

    public Hotel(Long hotelID, String hotelName, LocalTime latestPickUpTime, int bookingID){
        this.hotelID = hotelID;
        this.hotelName = hotelName;
        this.latestPickUpTime = latestPickUpTime;
        // this.bookingID = bookingID;
    }

    public Long getHotelID(){
        return hotelID;
    }

    public void setHotelID(Long hotelID){
        this.hotelID = hotelID;
    }

    public String getHotelName(){
        return hotelName;
    }

    public void setHotelName(String hotelName){
        this.hotelName = hotelName;
    }

    public LocalTime getLatestPickUpTime(){
        return latestPickUpTime;
    }

    public void setLatestPickUpTime(LocalTime latestPickUpTime){
        this.latestPickUpTime = latestPickUpTime;
    }

    // public int getBookingID(){
    //     return bookingID;
    // }

    // public void setBookingID(int bookingID){
    //     this.bookingID = bookingID;
    // }


    public List<Reservation> getreservations() {
        return reservations;
    }

    public void setReservation(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    // public List<User> getUsers() {
    //    return users;
    // }

    // public void setUsers(List<User> users) {
    //    this.users = users;
    // }
}