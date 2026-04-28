package com.quiambao.mypetstore.catalog;

import java.math.BigDecimal;

public final class PetListing {

        private final Long id;
        private final String name;
        private final PetCategory category;
        private final BigDecimal price;
        private final String description;
        private final String imageUrl;
        private final boolean featured;
        private final int stockQuantity;

        public PetListing(
                        Long id,
                        String name,
                        PetCategory category,
                        BigDecimal price,
                        String description,
                        String imageUrl,
                        boolean featured,
                        int stockQuantity) {
                this.id = id;
                this.name = name;
                this.category = category;
                this.price = price;
                this.description = description;
                this.imageUrl = imageUrl;
                this.featured = featured;
                this.stockQuantity = stockQuantity;
        }

        public Long getId() {
                return id;
        }

        public String getName() {
                return name;
        }

        public PetCategory getCategory() {
                return category;
        }

        public BigDecimal getPrice() {
                return price;
        }

        public String getDescription() {
                return description;
        }

        public String getImageUrl() {
                return imageUrl;
        }

        public boolean isFeatured() {
                return featured;
        }

        public int getStockQuantity() {
                return stockQuantity;
        }
}
