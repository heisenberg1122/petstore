package com.quiambao.mypetstore.inventory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public record AnimalRequest(
        @NotBlank @Size(max = 160) String name,
        @NotBlank @Size(max = 120) String species,
        @Size(max = 120) String breed,
        @Size(max = 80) String age,
        @NotBlank @Size(max = 2000) String description,
        @NotNull BigDecimal price,
        @NotNull @PositiveOrZero Integer stockQuantity,
        List<String> images,
        boolean featured,
        @NotNull Long categoryId) {
}
