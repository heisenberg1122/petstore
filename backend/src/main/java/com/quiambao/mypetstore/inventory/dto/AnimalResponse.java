package com.quiambao.mypetstore.inventory.dto;

import java.math.BigDecimal;
import java.util.List;

public record AnimalResponse(
        Long id,
        String name,
        Long categoryId,
        String category,
        String categoryName,
        String species,
        String breed,
        String age,
        String description,
        BigDecimal price,
        Integer stockQuantity,
        List<String> images,
        boolean featured) {
}
