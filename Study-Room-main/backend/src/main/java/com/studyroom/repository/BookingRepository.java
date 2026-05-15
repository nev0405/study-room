package com.studyroom.repository;

import com.studyroom.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRoomCodeAndBookingDate(String roomCode, LocalDate bookingDate);
}
