package com.example.demo.controller;
import java.util.List;
import java.util.Optional;
import com.example.demo.model.MrtStation;
import com.example.demo.service.MrtStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/mrtStation")

public class MrtStationController {

    @Autowired
    private MrtStationService mrtStationService;

    // 新增一個 mrtStation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/")
    public ResponseEntity<MrtStation> createMrtStation(@RequestBody MrtStation mrtStation) {
        MrtStation createdMrtStation = mrtStationService.createMrtStation(mrtStation);
        return new ResponseEntity<>(createdMrtStation, HttpStatus.CREATED);
    }

    // 獲取所有 mrtStation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping
    public List<MrtStation> listAllmrtStation() {
        return mrtStationService.getAllStation();
    }

    // 獲取單個 mrtStation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping("/{station_id}")
    public ResponseEntity<MrtStation> getStationByStationID(@PathVariable("station_id") Long stationID) {
        Optional<MrtStation> mrtStationOptional = mrtStationService.getStationByStationID(stationID);
        return mrtStationOptional.map(ResponseEntity::ok)
                                 .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 更新一個 mrtStation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PutMapping("/{station_id}")
    public ResponseEntity<MrtStation> updateMrtStation(@PathVariable("station_id") Long stationID, @RequestBody MrtStation mrtStation) {
        Optional<MrtStation> updatedMrtStation = mrtStationService.updateMrtStation(stationID, mrtStation);
        return updatedMrtStation.map(ResponseEntity::ok)
                                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 刪除一個 mrtStation
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @DeleteMapping("/{station_id}")
    public ResponseEntity<Void> deleteStation(@PathVariable("station_id") Long stationID) {
        if (mrtStationService.deleteStationByStationID(stationID)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}