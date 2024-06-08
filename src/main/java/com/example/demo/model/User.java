package com.example.demo.model;

import java.util.List;
import jakarta.persistence.*;

// import org.springframework.security.access.method.P;

@Entity
@Table(name = "user")
public class User {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userID;
 
    // Column = Attribute
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 64)
    private String password;

    // User是many，Hotel是one
    // @ManyToOne
    // @MapsId("Hotel_ID") // (java)MapsID = 對應到的class的PK
    // @JoinColumn(name = "hotel_id") // (sql)JoinColumn 
    // private Hotel hotels;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) // (java)
    private List<Reservation> reservations; 

    // Constructors
    public User() {
    }

    public User(Long userID, String email, String password) {
        this.userID = userID;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
