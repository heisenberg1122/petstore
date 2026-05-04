package com.quiambao.mypetstore.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdoptionRepository extends JpaRepository<AdoptionRecord, Long> {
    List<AdoptionRecord> findByCustomerEmail(String customerEmail);
}
