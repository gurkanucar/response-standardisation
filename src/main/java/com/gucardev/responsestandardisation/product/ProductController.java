package com.gucardev.responsestandardisation.product;

import com.gucardev.responsestandardisation.config.response.ApiResponse;
import com.gucardev.responsestandardisation.config.response.PageableResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Product Controller", description = "Controller for product operations")
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "Search products",
            description = "This api allows you to search and filter products with pagination"
    )
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageableResponse<ProductDto>>> searchProducts(
            @Valid @ParameterObject ProductFilterRequest filterRequest) {
        return ResponseEntity.ok(ApiResponse.success(productService.searchProducts(filterRequest)));
    }

    @Operation(
            summary = "Get product by id",
            description = "This api retrieves product by id"
    )
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDto>> getProductById(@PathVariable Long id) {
        var productDto = productService.getProduct(id);
        return ResponseEntity.ok(ApiResponse.success(new ProductDto(productDto)));
    }

    @Operation(
            summary = "Create a new product",
            description = "This api creates a new product and return created product"
    )
    @PostMapping
    public ResponseEntity<ApiResponse<ProductDto>> createProduct(@Valid ProductRequest productRequest) {
        ProductDto productDto = productService.createProduct(productRequest);
        return ResponseEntity.ok(ApiResponse.success(productDto));
    }

    @Operation(
            summary = "Update existing product",
            description = "This api updates existing product and return its updated version"
    )
    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDto>> updateProduct(@Valid ProductRequest productRequest, @PathVariable Long id) {
        ProductDto productDto = productService.updateProduct(productRequest, id);
        return ResponseEntity.ok(ApiResponse.success(productDto));
    }

    @Operation(
            summary = "Delete product by id",
            description = "This api deletes product by id"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteProductById(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.successWithEmptyData());
    }
}
