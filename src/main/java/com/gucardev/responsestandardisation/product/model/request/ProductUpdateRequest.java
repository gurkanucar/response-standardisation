package com.gucardev.responsestandardisation.product.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record ProductUpdateRequest(
        @Schema(description = "product description", example = "awesome phone")
        @NotBlank
        @Length(min = 3, max = 50)
        String description) {
}
