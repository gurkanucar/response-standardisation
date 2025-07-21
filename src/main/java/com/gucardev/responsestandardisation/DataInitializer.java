package com.gucardev.responsestandardisation;

import com.gucardev.responsestandardisation.product.Product;
import com.gucardev.responsestandardisation.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Product> products = Arrays.asList(
                createProduct("iPhone 15 Pro"),
                createProduct("iPhone 16"),
                createProduct("Samsung Galaxy S24"),
                createProduct("Google Pixel 9"),
                createProduct("OnePlus 12"),
                createProduct("Xiaomi Mi 14"),
                createProduct("Sony Xperia 1 VI"),
                createProduct("Motorola Edge 50"),
                createProduct("Huawei P70"),
                createProduct("Oppo Find X7"));
        productRepository.saveAll(products);
    }

    private Product createProduct(String name) {
        return Product.builder()
                .name(name)
                .description("Description for " + name)
                .build();
    }
}