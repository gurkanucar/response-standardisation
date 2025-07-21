package com.gucardev.responsestandardisation.product;

import com.gucardev.responsestandardisation.config.exception.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.gucardev.responsestandardisation.config.exception.ExceptionUtil.buildException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductDto createProduct(ProductRequest productRequest) {
        if (productRepository.existsByNameIgnoreCase(productRequest.name())) {
            throw buildException(ExceptionMessage.ALREADY_EXISTS_EXCEPTION);
        }
        Product product = productRepository.save(ProductRequest.toProduct(productRequest));
        log.debug("Product created: {}", product);
        return new ProductDto(product);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> buildException(ExceptionMessage.PRODUCT_NOT_FOUND_EXCEPTION, id));
    }

    public Page<ProductDto> getAllProducts(int page, int size) {
        return productRepository.findAll(Pageable.ofSize(size).withPage(page))
                .map(ProductDto::new);
    }

}
