package com.quiambao.mypetstore.inventory;

import java.text.Normalizer;

final class SlugUtils {

    private SlugUtils() {
    }

    static String slugify(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String slug = normalized.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+", "")
                .replaceAll("-+$", "");
        return slug.isBlank() ? "category" : slug;
    }
}
