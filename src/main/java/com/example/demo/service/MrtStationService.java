package com.example.demo.service;
import com.example.demo.model.MrtStation;
import com.example.demo.repository.MrtStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class MrtStationService {

    @Autowired
    private MrtStationRepository mrtStationRepository;

    // 新增一個 mrtStation
    public MrtStation createMrtStation(MrtStation mrtstation) {
        return mrtStationRepository.save(mrtstation);
    }

    // 獲取所有 mrtStation
    public List<MrtStation> getAllStation() {
        return mrtStationRepository.findAll();
    }

    // 獲取單個 mrtStation
    public Optional<MrtStation> getStationByStationID(Long stationID) {
        return mrtStationRepository.findByStationID(stationID);
    }

    // 更新一個 mrtStation
    public Optional<MrtStation> updateMrtStation(Long stationID, MrtStation newMrtStation) {
        return mrtStationRepository.findByStationID(stationID).map(mrtStation -> {
            mrtStation.setMrtStationLocation(newMrtStation.getMrtStationLocation());
            mrtStation.setStationName(newMrtStation.getStationName());
            return mrtStationRepository.save(mrtStation);
        });
    }

    // 刪除一個 mrtStation
    public boolean deleteStationByStationID(Long stationID) {
        if (mrtStationRepository.existsById(stationID)) {
            mrtStationRepository.deleteById(stationID);
            return true;
        }
        return false;
    }
}