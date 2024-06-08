package com.example.demo.repository;
import com.example.demo.model.MrtStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface MrtStationRepository extends JpaRepository<MrtStation, Long> {
    Optional<MrtStation> findByStationID(Long stationID);
}