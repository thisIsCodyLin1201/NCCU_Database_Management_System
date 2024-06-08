package com.example.demo.repository;
import com.example.demo.model.Locker;
import com.example.demo.model.Locker_ID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface LockerRepository extends JpaRepository<Locker, Locker_ID> {
    Optional<Locker> findByLockerId(Locker_ID lockerId);
}