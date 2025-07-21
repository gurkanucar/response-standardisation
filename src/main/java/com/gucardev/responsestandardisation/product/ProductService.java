package com.gucardev.responsestandardisation.product;

import com.gucardev.responsestandardisation.config.exception.ExceptionMessage;
import com.gucardev.responsestandardisation.product.model.request.ProductCreateRequest;
import com.gucardev.responsestandardisation.product.model.request.ProductFilterRequest;
import com.gucardev.responsestandardisation.product.model.request.ProductUpdateRequest;
import com.gucardev.responsestandardisation.product.model.response.ProductDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static com.gucardev.responsestandardisation.config.exception.ExceptionUtil.buildException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductDto createProduct(ProductCreateRequest productRequest) {
        if (productRepository.existsByNameIgnoreCase(productRequest.name())) {
            throw buildException(ExceptionMessage.ALREADY_EXISTS_EXCEPTION);
        }
        Product product = productRepository.save(ProductCreateRequest.toProduct(productRequest));
        log.debug("Product created: {}", product);
        return new ProductDto(product);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> buildException(ExceptionMessage.PRODUCT_NOT_FOUND_EXCEPTION, id));
    }

    public ProductDto updateProduct(ProductUpdateRequest productRequest, Long id) {
        Product existing = getProduct(id);
        existing.setDescription(productRequest.description());
        Product updatedProduct = productRepository.save(existing);
        log.debug("Product updated: {}", updatedProduct);
        return new ProductDto(updatedProduct);
    }

    public Page<ProductDto> searchProducts(@Valid ProductFilterRequest filterRequest) {
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize(),
                Sort.by(filterRequest.getSortDir(), filterRequest.getSortBy()));

        //anyOf: or, allOf: and
        Specification<Product> spec = Specification.allOf(
                ProductSpecification.hasNameLike(filterRequest.getName()),
                ProductSpecification.hasDescriptionLike(filterRequest.getDescription())
        );

        Page<Product> accountsPage = productRepository.findAll(spec, pageable);
        return accountsPage.map(ProductDto::new);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
