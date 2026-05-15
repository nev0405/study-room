package com.studyroom.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomCode;
    private Integer seatNumber;
    private LocalDate bookingDate;
    private Integer startSlot;
    private Integer endSlot;
    private Integer groupSize;
    private String studentName;
    private LocalDateTime createdAt;

    public Booking() {}

    public Booking(String roomCode, Integer seatNumber, LocalDate bookingDate, Integer startSlot,
                   Integer endSlot, Integer groupSize, String studentName) {
        this.roomCode = roomCode;
        this.seatNumber = seatNumber;
        this.bookingDate = bookingDate;
        this.startSlot = startSlot;
        this.endSlot = endSlot;
        this.groupSize = groupSize;
        this.studentName = studentName;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    public void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRoomCode() { return roomCode; }
    public void setRoomCode(String roomCode) { this.roomCode = roomCode; }
    public Integer getSeatNumber() { return seatNumber; }
    public void setSeatNumber(Integer seatNumber) { this.seatNumber = seatNumber; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public Integer getStartSlot() { return startSlot; }
    public void setStartSlot(Integer startSlot) { this.startSlot = startSlot; }
    public Integer getEndSlot() { return endSlot; }
    public void setEndSlot(Integer endSlot) { this.endSlot = endSlot; }
    public Integer getGroupSize() { return groupSize; }
    public void setGroupSize(Integer groupSize) { this.groupSize = groupSize; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
