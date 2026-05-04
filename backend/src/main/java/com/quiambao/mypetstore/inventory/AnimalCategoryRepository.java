package com.quiambao.mypetstore.inventory;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, Long> {

    Optional<AnimalCategory> findBySlugIgnoreCase(String slug);

    Optional<AnimalCategory> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    boolean existsBySlugIgnoreCase(String slug);
}
