package com.gucardev.responsestandardisation.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gucardev.responsestandardisation.config.message.MessageUtil;
import com.gucardev.responsestandardisation.product.model.request.ProductCreateRequest;
import com.gucardev.responsestandardisation.product.model.request.ProductFilterRequest;
import com.gucardev.responsestandardisation.product.model.request.ProductUpdateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    private static final String BASE_URL = "/api/v1/products";

    private Product testProduct;

    @BeforeEach
    void setUp() {
        productRepository.deleteAll();
        testProduct = productRepository.save(Product.builder()
                .name("Test Product")
                .description("Test Description")
                .build());
    }

    @Test
    void searchProducts_ShouldReturnPagedResults() throws Exception {
        // Given
        ProductFilterRequest filterRequest = new ProductFilterRequest("name", "desc", 0, 10, "asc", "id");

        // When & Then
        mockMvc.perform(get(BASE_URL + "/search")
                        .param("page", String.valueOf(filterRequest.getPage()))
                        .param("size", String.valueOf(filterRequest.getSize()))
                        .param("sortDir", "desc")
                        .param("sortBy", filterRequest.getSortBy()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.error").value(false))
                .andExpect(jsonPath("$.data.content[0].name").value(testProduct.getName()))
                .andExpect(jsonPath("$.data.content[0].description").value(testProduct.getDescription()));
    }

    @Test
    void searchProducts_WhenNoProductsExist_ShouldReturnEmptyListMessage() throws Exception {
        // Remove all products to ensure empty result
        productRepository.deleteAll();
        mockMvc.perform(get(BASE_URL + "/search")
                        .header("Accept-Language", "en")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.error").value(false))
                .andExpect(jsonPath("$.message").value(MessageUtil.getMessage("emptylist")))
                .andExpect(jsonPath("$.data.content").isEmpty());
    }

    @Test
    void getProductById_ShouldReturnProduct() throws Exception {
        mockMvc.perform(get(BASE_URL + "/{id}", testProduct.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.error").value(false))
                .andExpect(jsonPath("$.data.id").value(testProduct.getId()))
                .andExpect(jsonPath("$.data.name").value(testProduct.getName()));
    }

    @Test
    void getProductById_WithInvalidId_ShouldReturnNotFound() throws Exception {
        mockMvc.perform(get(BASE_URL + "/{id}", 99999L))
                .andExpect(status().isNotFound());
    }

    @Test
    void createProduct_ShouldCreateAndReturnProduct() throws Exception {
        // Given
        ProductCreateRequest request = new ProductCreateRequest("Test Product Name", "Test Product Description");

        // When & Then
        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.error").value(false))
                .andExpect(jsonPath("$.data.name").value(request.name()))
                .andReturn();
    }

    @Test
    void updateProduct_ShouldUpdateAndReturnProduct() throws Exception {
        // Given
        ProductUpdateRequest request = new ProductUpdateRequest("Updated Description");

        // When & Then
        mockMvc.perform(put(BASE_URL + "/{id}", testProduct.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.error").value(false))
                .andExpect(jsonPath("$.data.description").value(request.description()));
    }

    @Test
    void deleteProduct_ShouldDeleteSuccessfully() throws Exception {
        mockMvc.perform(delete(BASE_URL + "/{id}", testProduct.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.error").value(false));

        assertFalse(productRepository.existsById(testProduct.getId()));
    }

    @Test
    void createProduct_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given
        ProductCreateRequest request = new ProductCreateRequest("", "");

        // When & Then
        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void searchProducts_WithInvalidPagination_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get(BASE_URL + "/search")
                        .param("page", "-1")
                        .param("size", "0")
                        .param("sortDir", "invalid")
                        .param("sortBy", ""))
                .andExpect(status().isBadRequest());
    }

}
