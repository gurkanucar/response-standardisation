package com.gucardev.responsestandardisation.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    private String description;

    @Override
    public String toString() {
        return "{id=%d, name='%s', description='%s'}".formatted(id, name, description);
    }
}
