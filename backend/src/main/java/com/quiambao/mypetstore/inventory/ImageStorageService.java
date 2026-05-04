package com.quiambao.mypetstore.inventory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ImageStorageService {

    private final Path uploadDir;

    public ImageStorageService(@Value("${app.storage.upload-dir:uploads}") String uploadDir) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image file is required");
        }

        try {
            Files.createDirectories(uploadDir);
            String originalFilename = file.getOriginalFilename();
            String originalName = StringUtils.cleanPath(originalFilename == null ? "image" : originalFilename);
            String extension = "";
            int dotIndex = originalName.lastIndexOf('.');
            if (dotIndex >= 0) {
                extension = originalName.substring(dotIndex);
            }

            String storedFileName = UUID.randomUUID() + extension;
            Path target = uploadDir.resolve(storedFileName).normalize();
            Files.copy(file.getInputStream(), target);
            return "/uploads/" + storedFileName;
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to store uploaded image", ex);
        }
    }
}
