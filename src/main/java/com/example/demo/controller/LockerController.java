package com.example.demo.controller;
import com.example.demo.model.Locker;
import com.example.demo.model.Locker_ID;
import com.example.demo.service.LockerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/locker")
public class LockerController {

    @Autowired
    private LockerService lockerService;

    // 新增一個 locker
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/")
    public ResponseEntity<Locker> createLocker(@RequestBody Locker locker) {
        Locker createdLocker = lockerService.createLocker(locker);
        return new ResponseEntity<Locker>(createdLocker, HttpStatus.CREATED);
    }

    // 獲取所有 lockers
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping
    public List<Locker> listAllLocker(@RequestParam(required = false, name = "locker_id") int LockerID) {
        return lockerService.getAllLocker();
    }

    // 利用Locker_ID獲取單個locker
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping("/{locker_id}")
    public ResponseEntity<Locker> getLockerByLockerID(@PathVariable("locker_id") Locker_ID lockerId) {
        Optional<Locker> updatedLocker = lockerService.getLockerByLockerID(lockerId);
        return updatedLocker.map(ResponseEntity::ok)
                            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 更新一個 locker
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PutMapping("/{locker_id}")
    public ResponseEntity<Locker> updateLocker(@PathVariable("locker_id") Locker_ID lockerId, @RequestBody Locker locker) {
        Optional<Locker> updatedLocker = lockerService.updateLocker(lockerId, locker);
        return updatedLocker.map(ResponseEntity::ok)
                            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 利用Locker_ID刪除一個 locker
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @DeleteMapping("/{locker_id}")
    public ResponseEntity<Void> deleteLocker(@PathVariable("locker_id") Locker_ID lockerId) {
        if (lockerService.deleteLockerByLockerID(lockerId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
