package com.quiambao.mypetstore.inventory.dto;

public record CategoryResponse(
        Long id,
        String name,
        String slug,
        long animalCount) {
}
