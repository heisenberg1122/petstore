package com.quiambao.mypetstore.catalog;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CatalogService {

    public List<PetListing> findFeaturedCatalog() {
        return List.of(
                new PetListing(
                        1L,
                        "Golden Retriever Puppy",
                        PetCategory.DOGS,
                        new BigDecimal("1200.00"),
                        "Friendly family companion with playful energy.",
                        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
                        true,
                        4),
                new PetListing(
                        2L,
                        "Maine Coon Cat",
                        PetCategory.CATS,
                        new BigDecimal("900.00"),
                        "Large, affectionate cat with a calm temperament.",
                        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80",
                        true,
                        6),
                new PetListing(
                        3L,
                        "Sun Conure",
                        PetCategory.BIRDS,
                        new BigDecimal("450.00"),
                        "Bright, social bird with a bold personality.",
                        "https://images.unsplash.com/photo-1501706362039-c6e80948c85d?auto=format&fit=crop&w=900&q=80",
                        true,
                        2),
                new PetListing(
                        4L,
                        "Betta Fish Starter Set",
                        PetCategory.FISHES,
                        new BigDecimal("85.00"),
                        "Colorful beginner-friendly aquarium companion.",
                        "https://images.unsplash.com/photo-1524704654690-b56c7d9a38f6?auto=format&fit=crop&w=900&q=80",
                        false,
                        10));
    }
}
