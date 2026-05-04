package com.quiambao.mypetstore.inventory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "*")
public class AdoptionController {

    private final AdoptionRepository adoptionRepository;
    private final AnimalRepository animalRepository;

    public AdoptionController(AdoptionRepository adoptionRepository, AnimalRepository animalRepository) {
        this.adoptionRepository = adoptionRepository;
        this.animalRepository = animalRepository;
    }

    @PostMapping
    public ResponseEntity<AdoptionRecord> createAdoption(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("customerEmail");
        String name = (String) payload.get("customerName");
        String scheduledDateStr = (String) payload.get("scheduledDate");
        java.math.BigDecimal total = new java.math.BigDecimal(payload.get("totalAmount").toString());
        
        Object cartItemsValue = payload.get("cartItems");
        if (!(cartItemsValue instanceof List<?> cartItemsRaw)) {
            throw new IllegalArgumentException("cartItems must be a list");
        }

        List<Animal> animals = new java.util.ArrayList<>();
        
        for (Object item : cartItemsRaw) {
            if (!(item instanceof Map<?, ?> itemMap)) {
                throw new IllegalArgumentException("Each cart item must be a map with 'id' and 'quantity'");
            }
            Long animalId = ((Number) itemMap.get("id")).longValue();
            int quantity = ((Number) itemMap.get("quantity")).intValue();
            
            Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new IllegalArgumentException("Animal not found: " + animalId));
            
            // Reduce stock by the quantity purchased
            if (animal.getStockQuantity() >= quantity) {
                animal.setStockQuantity(animal.getStockQuantity() - quantity);
                animalRepository.save(animal);
            } else {
                throw new IllegalArgumentException("Insufficient stock for " + animal.getName());
            }
            
            animals.add(animal);
        }

        AdoptionRecord record = new AdoptionRecord(
            email,
            name,
            java.time.LocalDateTime.parse(scheduledDateStr),
            total,
            "PENDING",
            animals
        );

        return ResponseEntity.ok(adoptionRepository.save(record));
    }

    @GetMapping("/my")
    public List<AdoptionRecord> getMyAdoptions(@RequestParam String email) {
        return adoptionRepository.findByCustomerEmail(email);
    }
}
