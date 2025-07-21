package com.gucardev.responsestandardisation;

import com.gucardev.responsestandardisation.product.Product;
import com.gucardev.responsestandardisation.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        List<String> productNames = List.of(
                "iPhone 15 Pro", "Samsung Galaxy S24", "Google Pixel 9",
                "Sony WH-1000XM5", "Dell XPS 15", "MacBook Pro 16",
                "Logitech MX Master 3S", "Samsung 4K Monitor", "LG OLED TV",
                "PlayStation 5", "Xbox Series X", "Nintendo Switch OLED",
                "Bose QuietComfort Earbuds", "Canon EOS R5", "DJI Mini 3 Pro",
                "Apple Watch Ultra", "Garmin Forerunner 965", "Fitbit Charge 6",
                "Kindle Paperwhite", "GoPro Hero 12", "Nest Thermostat",
                "Philips Hue Smart Bulb", "Ring Doorbell 4", "Dyson V15 Detect",
                "Instant Pot Pro", "Nespresso Vertuo", "KitchenAid Stand Mixer",
                "Razer Blade 14", "Alienware Aurora R15", "Asus ROG Strix",
                "JBL Flip 6", "Anker PowerCore 10000", "Tile Pro Tracker",
                "Steam Deck", "Elgato Stream Deck", "BenQ ScreenBar"
        );

        List<Product> products = productNames.stream()
                .map(this::createProduct)
                .collect(Collectors.toList());

        productRepository.saveAll(products);
    }

    private Product createProduct(String name) {
        return Product.builder()
                .name(name)
                .description("Description for " + name)
                .build();
    }
}
