package com.example.demo.repository;
import com.example.demo.model.Reservation;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // @Query(value="SELECT * FROM reservation AS r WHERE r.userId = %?1", nativeQuery = true)
    // Optional<Reservation> findByUser_ID(Long userID);
    // @Query(value="SELECT * FROM reservation AS r WHERE r.reservationId = %?1", nativeQuery = true)
    // Optional<Reservation> findByReservation_Id(Long reservationID);
    // Optional<Reservation> findTopByUserIdOrderByDepositTimestampDesc(Long userId);
    Optional<Reservation> findById(Long reservationID);
}
