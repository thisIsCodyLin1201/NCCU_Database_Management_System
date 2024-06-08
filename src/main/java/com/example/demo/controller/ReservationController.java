package com.example.demo.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Locker;
import com.example.demo.model.User;
import com.example.demo.model.Reservation;
import com.example.demo.service.ReservationService;
import com.example.demo.service.UserService;
import com.example.demo.service.LockerService;

@RestController // 讓RequestMapping生效
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private UserService userService;

    @Autowired
    private LockerService lockerService;

    @Autowired
    private ReservationService reservationService;

    // 新增一個 reservation 
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/addreservation")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        Reservation createdReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<Reservation>(createdReservation, HttpStatus.CREATED);
    }

    // 獲取所有 reservations
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping
    public List<Reservation> listAllReservation(@RequestParam(required = false, name = "reservation_id") Long reservationID) {
        return reservationService.getAllReservation();
    }

    // 利用Reservation_ID 獲取單個 reservation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping("/{reservation_id}")
    public ResponseEntity<Reservation> getReservationByReservationID(@PathVariable("reservation_id") Long reservationID) {
    Optional<Reservation> reservationOptional = reservationService.getReservationByReservationID(reservationID);
    if (reservationOptional.isPresent()) {
        return ResponseEntity.ok(reservationOptional.get());
    } else {
        return ResponseEntity.notFound().build();
    }
    }

    // 更新一個 reservation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PutMapping("/{reservation_id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable("reservation_id") Long reservationID, @RequestBody Reservation reservation) {
        Optional<Reservation> updatedReservation = reservationService.updateReservation(reservationID, reservation);
        if (updatedReservation.isPresent()) {
            return ResponseEntity.ok(updatedReservation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 利用Reservation_ID 刪除一個 reservation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @DeleteMapping("/{reservation_id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable("reservation_id") Long reservationID) {
        if (reservationService.deleteReservationByReservationID(reservationID)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
