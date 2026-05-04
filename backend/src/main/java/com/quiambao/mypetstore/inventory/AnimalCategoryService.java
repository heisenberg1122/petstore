package com.quiambao.mypetstore.inventory;

import com.quiambao.mypetstore.inventory.dto.CategoryRequest;
import com.quiambao.mypetstore.inventory.dto.CategoryResponse;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class AnimalCategoryService {

    private final AnimalCategoryRepository categoryRepository;
    private final AnimalRepository animalRepository;

    public AnimalCategoryService(AnimalCategoryRepository categoryRepository, AnimalRepository animalRepository) {
        this.categoryRepository = categoryRepository;
        this.animalRepository = animalRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> listCategories() {
        return categoryRepository.findAll().stream()
                .sorted(Comparator.comparing(AnimalCategory::getName, String.CASE_INSENSITIVE_ORDER))
                .map(this::toResponse)
                .toList();
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        String trimmedName = request.name().trim();
        if (categoryRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category already exists");
        }

        String slug = uniqueSlug(trimmedName);
        AnimalCategory saved = categoryRepository.save(new AnimalCategory(trimmedName, slug));
        return toResponse(saved);
    }

    public void deleteCategory(Long id) {
        Long categoryId = Objects.requireNonNull(id, "Category id is required");
        AnimalCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        if (animalRepository.countByCategoryId(category.getId()) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Remove animals from the category before deleting it");
        }
        categoryRepository.delete(category);
    }

    @Transactional(readOnly = true)
    public AnimalCategory requireCategory(Long id) {
        Long categoryId = Objects.requireNonNull(id, "Category id is required");
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category not found"));
    }

    private CategoryResponse toResponse(AnimalCategory category) {
        long count = animalRepository.countByCategoryId(category.getId());
        return new CategoryResponse(category.getId(), category.getName(), category.getSlug(), count);
    }

    private String uniqueSlug(String name) {
        String base = SlugUtils.slugify(name);
        String candidate = base;
        int suffix = 2;
        while (categoryRepository.existsBySlugIgnoreCase(candidate)) {
            candidate = base + "-" + suffix++;
        }
        return candidate;
    }
}
