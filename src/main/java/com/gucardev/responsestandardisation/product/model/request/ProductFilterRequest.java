package com.gucardev.responsestandardisation.product.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterRequest {

    @Schema(description = "Filter by name", example = "phone")
    @Size(max = 255)
    private String name;

    @Schema(description = "Filter by description", example = "phone")
    @Size(max = 255)
    private String description;

    @Schema(description = "Page number (starts from 0)", example = "0")
    @NotNull
    @Min(0)
    @Max(99999)
    private int page = 0;

    @Schema(description = "Number of records per page", example = "30")
    @NotNull
    @Min(1)
    @Max(150)
    @Positive
    private int size = 30;

    @Schema(description = "Sort direction", example = "desc", allowableValues = {"asc", "desc"})
    @Pattern(regexp = "^(asc|desc)$", message = "{sort.direction.pattern.exception}")
    private String sortDir = "desc";

    @Schema(description = "Sort by field", example = "id")
    private String sortBy = "id";

    public Sort.Direction getSortDir() {
        return this.sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
    }

}
