package com.gucardev.responsestandardisation.product.model.request;

import com.gucardev.responsestandardisation.product.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record ProductCreateRequest(
        @Schema(description = "product name", example = "phone")
        @NotBlank
        @Length(min = 3, max = 50)
        String name,

        @Schema(description = "product description", example = "awesome phone")
        @NotBlank
        @Length(min = 3, max = 50)
        String description) {
    public static Product toProduct(ProductCreateRequest product) {
        return Product.builder().name(product.name).description(product.description).build();
    }
}
