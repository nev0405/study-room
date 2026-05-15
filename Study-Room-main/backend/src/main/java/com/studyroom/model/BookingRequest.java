package com.studyroom.model;

import java.time.LocalDate;
import java.util.List;

public class BookingRequest {
    private String roomCode;
    private List<Integer> seatNumbers;
    private LocalDate bookingDate;
    private List<Integer> timeSlots;
    private Integer groupSize;
    private String studentName;

    public String getRoomCode() { return roomCode; }
    public void setRoomCode(String roomCode) { this.roomCode = roomCode; }
    public List<Integer> getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(List<Integer> seatNumbers) { this.seatNumbers = seatNumbers; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public List<Integer> getTimeSlots() { return timeSlots; }
    public void setTimeSlots(List<Integer> timeSlots) { this.timeSlots = timeSlots; }
    public Integer getGroupSize() { return groupSize; }
    public void setGroupSize(Integer groupSize) { this.groupSize = groupSize; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
}
