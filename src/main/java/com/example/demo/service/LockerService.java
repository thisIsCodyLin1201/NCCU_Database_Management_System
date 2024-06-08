package com.example.demo.service;
import com.example.demo.model.Locker;
import com.example.demo.model.Locker_ID;
// import com.example.demo.model.MrtStation;
// import com.example.demo.model.Reservation;
import com.example.demo.repository.LockerRepository;
// import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class LockerService {

    @Autowired
    private LockerRepository lockerRepository;

    public Locker createLocker(Locker locker) {
        return lockerRepository.save(locker);
    }

// 獲取所有 lockers
    public List<Locker> getAllLocker() {
        return lockerRepository.findAll();
    }

// 利用Locker_ID獲取單個locker
    public Optional<Locker> getLockerByLockerID(Locker_ID lockerId) {
        return lockerRepository.findByLockerId(lockerId);
    }

    public Optional<Locker> updateLocker(Locker_ID lockerId, Locker newLocker) {
        return lockerRepository.findByLockerId(lockerId).map(locker -> {
          
            locker.setStatusUsed(newLocker.getStatusUsed());
            locker.setStatusNotUsed(newLocker.getStatusNotUsed());
            locker.setStatusReservedButNotUsed(newLocker.getStatusReservedButNotUsed());
            return lockerRepository.save(locker);
        });
    }

    //刪除一個reservation
    public boolean deleteLockerByLockerID(Locker_ID lockerId) {
        if (lockerRepository.existsById(lockerId)) {
            lockerRepository.deleteById(lockerId);
            return true;
        }
        return false;
    }

}
