package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Calendar;
import java.time.Duration;
import java.time.Instant;

@Entity
@Table(name = "reservation")
public class Reservation {@Column(name = "password", nullable = true)
    private String password;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "reservation_id")
    private Long reservationID;
    
    

    @Column(name = "deposit_timestamp", nullable = false)
    private Calendar depositTimestamp;

    @Column(name = "pick_up_timestamp", nullable = false)
    private Calendar pickUpTimestamp;

    @Column(name = "deposit_or_delivery", nullable = false)
    private Boolean depositOrDelivery;

    // Be_Delivered_To
    @Column(name = "delivery_id", nullable = true)
    private Long deliveryID;

    @Column(name = "status_picked_up", nullable = true)
    private Boolean statusPickedUp;

    @Column(name = "status_waiting", nullable = true)
    private Boolean statusWaiting;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "station_id", referencedColumnName = "station_id", insertable = false, updatable = false),
        @JoinColumn(name = "locker_id", referencedColumnName = "locker_id", insertable = false, updatable = false)
    })
    private Locker locker;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id"/*sql*/,nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "hotel_id", referencedColumnName = "hotel_id"/*sql*/)
    private Hotel hotel;

    public Reservation() {
    }

    public Reservation(Long reservationID, Calendar depositTimestamp, Calendar pickUpTimestamp, Boolean depositOrDelivery, Long deliveryID, Boolean statusPickedUp, Boolean statusWaiting) {
        this.reservationID = reservationID;
        this.depositTimestamp = depositTimestamp;
        this.pickUpTimestamp = pickUpTimestamp;
        this.depositOrDelivery = depositOrDelivery;
        this.deliveryID = deliveryID;
        this.statusPickedUp = statusPickedUp;
        this.statusWaiting = statusWaiting;
    }

    public Long getReservationID() {
        return reservationID;
    }

    public void setReservationID(Long reservationID) {
        this.reservationID = reservationID;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public Locker getLocker(){
        return locker;
    }

    public void setLocker(Locker locker){
        this.locker = locker;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public Calendar getDepositTimestamp(){
        return depositTimestamp;
    }

    public void setDepositTimestamp(Calendar depositTimestamp){
        this.depositTimestamp = depositTimestamp;
    }

    public Calendar getPickUpTimestamp(){
        return pickUpTimestamp;
    }

    public void setPickUpTimestamp(Calendar pickUpTimestamp){
        this.pickUpTimestamp = pickUpTimestamp;
    }

    public Boolean getDepositOrDelivery(){
        return depositOrDelivery;
    }

    public void setDepositOrDelivery(Boolean depositOrDelivery){
        this.depositOrDelivery = depositOrDelivery;
    }

    public Long getDeliveryID(){
        return deliveryID;
    }

    public void setDeliveryID(Long deliveryID){
        this.deliveryID = deliveryID;
    }

    public Boolean getStatusPickedUp(){
        return statusPickedUp;
    }

    public void setStatusPicked(Boolean statusPickedUp){
        this.statusPickedUp = statusPickedUp;
    }

    public Boolean getStatusWaiting(){
        return statusWaiting;
    }

    public void setStatusWaiting(Boolean statusWaiting){
        this.statusWaiting = statusWaiting;
    }

    @Transient
    public Duration getTotalRentalTime() {
        if (pickUpTimestamp != null && depositTimestamp != null) {
            Instant depositInstant = depositTimestamp.toInstant();
            Instant pickupInstant = pickUpTimestamp.toInstant();
            return Duration.between(depositInstant, pickupInstant);
        } else {
            return Duration.ZERO;
        }
    }

    @Transient
    public Long getTotalRentalHours() {
        return getTotalRentalTime().toHours();
    }

    @Transient
    public Long getTotalRentalMinutes() {
        return getTotalRentalTime().toMinutes();
    }

    @Transient
    public Long getTotalRentalSeconds() {
        return getTotalRentalTime().getSeconds();
    }
}