package com.quiambao.mypetstore.inventory;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findByFeaturedTrueOrderByNameAsc();

    List<Animal> findAllByOrderByNameAsc();

    long countByCategoryId(Long categoryId);

    // Fetch animals with their category eagerly to avoid LazyInitializationException
    // Fetch animals with their category and images eagerly to avoid LazyInitializationException
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT a FROM Animal a LEFT JOIN FETCH a.category c LEFT JOIN FETCH a.images i WHERE a.featured = true ORDER BY a.name ASC")
    List<Animal> findFeaturedWithCategory();

    // Fetch all animals with their category eagerly to avoid LazyInitializationException
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT a FROM Animal a LEFT JOIN FETCH a.category c LEFT JOIN FETCH a.images i ORDER BY a.name ASC")
    List<Animal> findAllWithCategory();
}
