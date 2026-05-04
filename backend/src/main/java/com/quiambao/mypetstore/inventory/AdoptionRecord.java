package com.quiambao.mypetstore.inventory;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "adoption_records")
public class AdoptionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerEmail;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private LocalDateTime scheduledDate;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, COMPLETED

    @ManyToMany
    @JoinTable(
        name = "adoption_animals",
        joinColumns = @JoinColumn(name = "adoption_id"),
        inverseJoinColumns = @JoinColumn(name = "animal_id")
    )
    private List<Animal> animals;

    protected AdoptionRecord() {}

    public AdoptionRecord(String customerEmail, String customerName, LocalDateTime scheduledDate, BigDecimal totalAmount, String status, List<Animal> animals) {
        this.customerEmail = customerEmail;
        this.customerName = customerName;
        this.scheduledDate = scheduledDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.animals = animals;
    }

    public Long getId() { return id; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public LocalDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDateTime scheduledDate) { this.scheduledDate = scheduledDate; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<Animal> getAnimals() { return animals; }
    public void setAnimals(List<Animal> animals) { this.animals = animals; }
}
