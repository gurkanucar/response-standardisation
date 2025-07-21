package com.gucardev.responsestandardisation.product.model.response;

import com.gucardev.responsestandardisation.product.Product;

public record ProductDto(Long id, String name, String description) {
    public ProductDto(Product product) {
        this(product.getId(), product.getName(), product.getDescription());
    }
}
