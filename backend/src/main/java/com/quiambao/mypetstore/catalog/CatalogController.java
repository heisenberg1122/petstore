package com.quiambao.mypetstore.catalog;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/health")
    public String health() {
        return "ok";
    }

    @GetMapping("/catalog")
    public List<PetListing> catalog() {
        return catalogService.findFeaturedCatalog();
    }
}
