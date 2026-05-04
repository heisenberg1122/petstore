package com.quiambao.mypetstore.catalog;

import java.math.BigDecimal;

import java.util.List;

public final class PetListing {

        private final Long id;
        private final String name;
        private final String category;
        private final String categoryName;
        private final String species;
        private final BigDecimal price;
        private final String description;
        private final List<String> images;
        private final boolean featured;
        private final int stockQuantity;
        private final String breed;
        private final String age;

        public PetListing(
                        Long id,
                        String name,
                        String category,
                        String categoryName,
                        String species,
                        BigDecimal price,
                        String description,
                        List<String> images,
                        boolean featured,
                        int stockQuantity,
                        String breed,
                        String age) {
                this.id = id;
                this.name = name;
                this.category = category;
                this.categoryName = categoryName;
                this.species = species;
                this.price = price;
                this.description = description;
                this.images = images;
                this.featured = featured;
                this.stockQuantity = stockQuantity;
                this.breed = breed;
                this.age = age;
        }

        public Long getId() {
                return id;
        }

        public String getName() {
                return name;
        }

        public String getCategory() {
                return category;
        }

        public String getCategoryName() {
                return categoryName;
        }

        public String getSpecies() {
                return species;
        }

        public BigDecimal getPrice() {
                return price;
        }

        public String getDescription() {
                return description;
        }

        public List<String> getImages() {
                return images;
        }

        public boolean isFeatured() {
                return featured;
        }

        public int getStockQuantity() {
                return stockQuantity;
        }

        public String getBreed() {
                return breed;
        }

        public String getAge() {
                return age;
        }
}
