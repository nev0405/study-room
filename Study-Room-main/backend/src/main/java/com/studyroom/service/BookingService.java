package com.studyroom.service;

import com.studyroom.model.Booking;
import com.studyroom.model.BookingRequest;
import com.studyroom.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getBookings(String roomCode, java.time.LocalDate date) {
        return bookingRepository.findByRoomCodeAndBookingDate(roomCode, date);
    }

    public List<Booking> createBooking(BookingRequest request) {
        validateRequest(request);

        List<Integer> slots = request.getTimeSlots().stream().sorted().toList();
        int startSlot = slots.get(0);
        int endSlot = slots.get(slots.size() - 1);

        List<Booking> existingBookings = bookingRepository.findByRoomCodeAndBookingDate(
                request.getRoomCode(), request.getBookingDate()
        );

        for (Integer seat : request.getSeatNumbers()) {
            boolean conflict = existingBookings.stream().anyMatch(existing ->
                    existing.getSeatNumber().equals(seat)
                            && startSlot <= existing.getEndSlot()
                            && endSlot >= existing.getStartSlot()
            );

            if (conflict) {
                throw new IllegalArgumentException("Seat " + seat + " is already booked for this time.");
            }
        }

        List<Booking> bookingsToSave = new ArrayList<>();
        for (Integer seat : request.getSeatNumbers()) {
            bookingsToSave.add(new Booking(
                    request.getRoomCode(),
                    seat,
                    request.getBookingDate(),
                    startSlot,
                    endSlot,
                    request.getGroupSize(),
                    request.getStudentName()
            ));
        }

        return bookingRepository.saveAll(bookingsToSave);
    }

    private void validateRequest(BookingRequest request) {
        if (request.getRoomCode() == null || request.getRoomCode().isBlank()) {
            throw new IllegalArgumentException("Room code is required.");
        }
        if (request.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking date is required.");
        }
        if (request.getSeatNumbers() == null || request.getSeatNumbers().isEmpty()) {
            throw new IllegalArgumentException("At least one seat is required.");
        }
        if (request.getTimeSlots() == null || request.getTimeSlots().isEmpty()) {
            throw new IllegalArgumentException("At least one time slot is required.");
        }
        if (request.getTimeSlots().size() > 3) {
            throw new IllegalArgumentException("Maximum reservation length is 3 hours.");
        }
        if (request.getGroupSize() == null || !request.getGroupSize().equals(request.getSeatNumbers().size())) {
            throw new IllegalArgumentException("Group size must match selected seats.");
        }

        List<Integer> slots = request.getTimeSlots().stream().sorted(Comparator.naturalOrder()).toList();
        for (int i = 1; i < slots.size(); i++) {
            if (slots.get(i) != slots.get(i - 1) + 1) {
                throw new IllegalArgumentException("Time slots must be consecutive.");
            }
        }
    }
}
