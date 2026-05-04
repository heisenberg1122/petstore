package com.quiambao.mypetstore.inventory;

import com.quiambao.mypetstore.inventory.dto.AnimalRequest;
import com.quiambao.mypetstore.inventory.dto.AnimalResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/animals")
public class AdminAnimalController {

    private final AnimalService animalService;

    public AdminAnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public List<AnimalResponse> listAnimals() {
        return animalService.listAnimals();
    }

    @GetMapping("/{id}")
    public AnimalResponse getAnimal(@PathVariable Long id) {
        return animalService.getAnimal(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AnimalResponse createAnimal(@Valid @RequestBody AnimalRequest request) {
        return animalService.createAnimal(request);
    }

    @PutMapping("/{id}")
    public AnimalResponse updateAnimal(@PathVariable Long id, @Valid @RequestBody AnimalRequest request) {
        return animalService.updateAnimal(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
    }

    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AnimalResponse uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return animalService.updateAnimalImage(id, file);
    }
}
