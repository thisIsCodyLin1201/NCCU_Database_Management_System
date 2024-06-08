package com.example.demo.service;
import com.example.demo.model.Hotel;
import com.example.demo.repository.HotelRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getAllHotel() {
        return hotelRepository.findAll();
    }

    public Optional<Hotel> getHotelByHotelID(Long hotelID) {
        return hotelRepository.findById(hotelID);
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Optional<Hotel> updateHotel(Long hotelID, Hotel newHotel) {
        return hotelRepository.findByHotelID(hotelID).map(hotel -> {
            hotel.setHotelName(newHotel.getHotelName());
            return hotelRepository.save(hotel);
        });
    }

    public boolean deleteHotelByHotelID(Long hotelID) {
        if (hotelRepository.existsById(hotelID)) {
            hotelRepository.deleteById(hotelID);
            return true;
        }
        return false;
    }
}