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
                createProduct("Oppo Find X7"),
                createProduct("Vivo X90 Pro"),
                createProduct("Realme GT 3"),
                createProduct("Asus Zenfone 10"),
                createProduct("Nokia G50"),
                createProduct("LG Velvet 2"),
                createProduct("BlackBerry Key3"),
                createProduct("HTC U23 Pro"),
                createProduct("ZTE Axon 40 Ultra"),
                createProduct("Honor Magic 5 Pro"),
                createProduct("Tecno Phantom X2"),
                createProduct("Infinix Zero Ultra"),
                createProduct("Poco F5 Pro"),
                createProduct("Nothing Phone (2)"),
                createProduct("Realme 11 Pro"),
                createProduct("Vivo V27 Pro"),
                createProduct("Motorola Moto G Power 2024"),
                createProduct("Samsung Galaxy A54"),
                createProduct("Google Pixel 7a"),
                createProduct("Xiaomi Redmi Note 12 Pro"),
                createProduct("Oppo Reno 8 Pro"),
                createProduct("OnePlus Nord 3"),
                createProduct("Sony Xperia 10 V"),
                createProduct("Huawei Nova 11"),
                createProduct("Asus ROG Phone 7"),
                createProduct("Nokia X30 5G"),
                createProduct("LG Wing 2"),
                createProduct("BlackBerry Evolve 2"),
                createProduct("HTC Desire 22 Pro"),
                createProduct("ZTE Blade V40"),
                createProduct("Honor X40 GT"),
                createProduct("Tecno Camon 20 Pro"),
                createProduct("Infinix Note 12 Pro"),
                createProduct("Poco X5 Pro")
        );
        productRepository.saveAll(products);
    }

    private Product createProduct(String name) {
        return Product.builder()
                .name(name)
                .description("Description for " + name)
                .build();
    }
}