package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;
import java.time.Duration;
import java.math.BigDecimal;

@Entity
@Table(name = "locker")
public class Locker {
    @EmbeddedId
    @AttributeOverrides({
        @AttributeOverride(name = "station_id", column = @Column(name = "station_id")),
        @AttributeOverride(name = "locker_id", column = @Column(name = "locker_id"))
    })
    private Locker_ID lockerId;

    @Column(name = "locker_location", nullable = false)
    private String lockerLocation;

    @Column(name = "size", nullable = false)//20 24 32
    private int size;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "status_used", nullable = false)
    private Boolean statusUsed;

    @Column(name = "status_not_used", nullable = false)
    private Boolean statusNotUsed;

    @Column(name = "status_reserved_but_not_used", nullable = false)
    private Boolean statusReservedButNotUsed;

    @ManyToOne
    @JoinColumn(name = "station_id", referencedColumnName = "station_id", insertable = false, updatable = false)
    private MrtStation mrtStation;

    @OneToMany(mappedBy = "locker",cascade = CascadeType.ALL) //
    private List<Reservation> reservations;

    public Locker(){
    }

    public Locker(Locker_ID lockerId, int size, int price,Boolean statusUsed, Boolean statusNotUsed, Boolean statusReservedButNotUsed){
        this.lockerId = lockerId;
        this.size = size;
        this.price = price;
        this.statusUsed = statusUsed;
        this.statusNotUsed = statusNotUsed;
        this.statusReservedButNotUsed = statusReservedButNotUsed;
    }

    public Locker_ID getLockerId(){
        return lockerId;
    }

    public void setLockerId(Locker_ID lockerId){
        this.lockerId = lockerId;
    }

    public String getLockerLocation(){
        return lockerLocation;
    }

    public void setLockerStation(String lockerLocation){
        this.lockerLocation = lockerLocation;
    }

    public int getSize(){
        return size;
    }

    public void setSize(int size){
        this.size = size;
    }

    public int getPrice(){
        return price;
    }

    public void setPrice(int price){
        this.price = price;
    }

    public String getPaymentMethod(){
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod){
        this.paymentMethod = paymentMethod;
    }

    public Boolean getStatusUsed(){
        return statusUsed;
    }

    public void setStatusUsed(Boolean statusUsed){
        this.statusUsed = statusUsed;
    }

    public Boolean getStatusNotUsed(){
        return statusNotUsed;
    }

    public void setStatusNotUsed(Boolean statusNotUsed){
        this.statusNotUsed = statusNotUsed;
    }

    public Boolean getStatusReservedButNotUsed(){
        return statusReservedButNotUsed;
    }

    public void setStatusReservedButNotUsed(Boolean statusReservedButNotUsed){
        this.statusReservedButNotUsed = statusReservedButNotUsed;
    }

    @Transient
    public BigDecimal getTotalPrice() {
        if (getPrice() > 0 && getTotalRentalTime().toHours() > 0) {
            return BigDecimal.valueOf(getPrice()).multiply(BigDecimal.valueOf(getTotalRentalTime().toHours()));
        } else {
            return BigDecimal.ZERO;
        }
    }

    @Transient
    public Duration getTotalRentalTime() {
        if (reservations != null && !reservations.isEmpty()) {
            Reservation reservation = reservations.iterator().next();
            return reservation.getTotalRentalTime();
        } else {
            return Duration.ZERO;
        }
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        // This setter might not be necessary if totalPrice is always calculated dynamically.
    }
}