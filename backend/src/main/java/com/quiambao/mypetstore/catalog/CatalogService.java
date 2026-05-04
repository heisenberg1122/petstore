package com.quiambao.mypetstore.catalog;

import com.quiambao.mypetstore.inventory.AnimalRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogService {

    private final AnimalRepository animalRepository;

    public CatalogService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<PetListing> findFeaturedCatalog() {
        // use repository method that fetches category with JOIN FETCH to avoid lazy-init errors
        return animalRepository.findFeaturedWithCategory().stream()
                .map(animal -> new PetListing(
                        animal.getId(),
                        animal.getName(),
                        animal.getCategory().getSlug(),
                        animal.getCategory().getName(),
                        animal.getSpecies(),
                        animal.getPrice(),
                        animal.getDescription(),
                        animal.getImages(),
                        animal.isFeatured(),
                        animal.getStockQuantity(),
                        animal.getBreed(),
                        animal.getAge()))
                .collect(Collectors.toList());
    }

    public List<PetListing> findAllCatalog() {
        // Fetch all animals with their categories joined to avoid lazy-init errors
        return animalRepository.findAllWithCategory().stream()
                .map(animal -> new PetListing(
                        animal.getId(),
                        animal.getName(),
                        animal.getCategory().getSlug(),
                        animal.getCategory().getName(),
                        animal.getSpecies(),
                        animal.getPrice(),
                        animal.getDescription(),
                        animal.getImages(),
                        animal.isFeatured(),
                        animal.getStockQuantity(),
                        animal.getBreed(),
                        animal.getAge()))
                .collect(Collectors.toList());
    }
}
