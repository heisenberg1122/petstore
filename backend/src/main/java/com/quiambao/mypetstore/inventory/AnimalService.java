package com.quiambao.mypetstore.inventory;

import com.quiambao.mypetstore.catalog.PetListing;
import com.quiambao.mypetstore.inventory.dto.AnimalRequest;
import com.quiambao.mypetstore.inventory.dto.AnimalResponse;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final AnimalCategoryService categoryService;
    private final ImageStorageService imageStorageService;

    public AnimalService(
            AnimalRepository animalRepository,
            AnimalCategoryService categoryService,
            ImageStorageService imageStorageService) {
        this.animalRepository = animalRepository;
        this.categoryService = categoryService;
        this.imageStorageService = imageStorageService;
    }

    @Transactional(readOnly = true)
    public List<AnimalResponse> listAnimals() {
        return animalRepository.findAllByOrderByNameAsc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AnimalResponse getAnimal(Long id) {
        return toResponse(requireAnimal(id));
    }

    public AnimalResponse createAnimal(AnimalRequest request) {
        Long categoryId = Objects.requireNonNull(request.categoryId(), "Category id is required");
        AnimalCategory category = categoryService.requireCategory(categoryId);
        List<String> resolvedImages = normalizeNewImages(request.images());
        Animal animal = new Animal(
                request.name().trim(),
                request.species().trim(),
                request.breed() == null ? null : request.breed().trim(),
                request.age() == null ? null : request.age().trim(),
                request.description().trim(),
                request.price(),
                request.stockQuantity(),
                resolvedImages,
                request.featured(),
                category);
        return toResponse(animalRepository.save(animal));
    }

    public AnimalResponse updateAnimal(Long id, AnimalRequest request) {
        Animal animal = requireAnimal(id);
        Long categoryId = Objects.requireNonNull(request.categoryId(), "Category id is required");
        AnimalCategory category = categoryService.requireCategory(categoryId);
        List<String> resolvedImages = normalizeExistingImages(animal.getImages(), request.images());

        animal.setName(request.name().trim());
        animal.setSpecies(request.species().trim());
        animal.setBreed(request.breed() == null ? null : request.breed().trim());
        animal.setAge(request.age() == null ? null : request.age().trim());
        animal.setDescription(request.description().trim());
        animal.setPrice(request.price());
        animal.setStockQuantity(request.stockQuantity());
        animal.setImages(resolvedImages);
        animal.setFeatured(request.featured());
        animal.setCategory(category);

        return toResponse(animal);
    }

    public void deleteAnimal(Long id) {
        animalRepository.delete(Objects.requireNonNull(requireAnimal(id)));
    }

    public AnimalResponse updateAnimalImage(Long id, MultipartFile image) {
        Animal animal = requireAnimal(id);
        animal.setImages(List.of(imageStorageService.store(image)));
        return toResponse(animal);
    }

    @Transactional(readOnly = true)
    public List<PetListing> listCatalog() {
        return animalRepository.findByFeaturedTrueOrderByNameAsc().stream()
                .sorted(Comparator.comparing(Animal::getName, String.CASE_INSENSITIVE_ORDER))
                .map(animal -> {
                    AnimalCategory category = animal.getCategory();
                    return new PetListing(
                            animal.getId(),
                            animal.getName(),
                            category == null ? "uncategorized" : category.getSlug(),
                            category == null ? "Uncategorized" : category.getName(),
                            animal.getSpecies(),
                            animal.getPrice(),
                            animal.getDescription(),
                            normalizeExistingImages(animal.getImages(), null),
                            animal.isFeatured(),
                            animal.getStockQuantity(),
                            animal.getBreed(),
                            animal.getAge());
                })
                .toList();
    }

    private Animal requireAnimal(Long id) {
        Long animalId = Objects.requireNonNull(id, "Animal id is required");
        return animalRepository.findById(animalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal not found"));
    }

    private AnimalResponse toResponse(Animal animal) {
        AnimalCategory category = animal.getCategory();
        return new AnimalResponse(
                animal.getId(),
                animal.getName(),
                category == null ? null : category.getId(),
                category == null ? null : category.getSlug(),
                category == null ? null : category.getName(),
                animal.getSpecies(),
                animal.getBreed(),
                animal.getAge(),
                animal.getDescription(),
                animal.getPrice(),
                animal.getStockQuantity(),
                normalizeExistingImages(animal.getImages(), null),
                animal.isFeatured());
    }

    private List<String> normalizeNewImages(List<String> images) {
        List<String> cleaned = sanitizeImages(images);
        return cleaned.isEmpty() ? defaultImage() : cleaned;
    }

    private List<String> normalizeExistingImages(List<String> existingImages, List<String> requestedImages) {
        List<String> requested = sanitizeImages(requestedImages);
        if (!requested.isEmpty()) {
            return requested;
        }

        List<String> existing = sanitizeImages(existingImages);
        return existing.isEmpty() ? defaultImage() : existing;
    }

    private List<String> sanitizeImages(List<String> images) {
        if (images == null) {
            return List.of();
        }

        return images.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .collect(Collectors.toUnmodifiableList());
    }

    private List<String> defaultImage() {
        return List.of("https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80");
    }
}
