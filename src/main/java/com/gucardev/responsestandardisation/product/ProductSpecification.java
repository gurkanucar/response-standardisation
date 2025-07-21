package com.gucardev.responsestandardisation.product;

import org.springframework.data.jpa.domain.Specification;

import java.util.Locale;


public class ProductSpecification {

    public static Specification<Product> hasNameLike(String value) {
        return like("name", value);
    }

    public static Specification<Product> hasDescriptionLike(String value) {
        return like("description", value);
    }

    public static <T> Specification<T> like(String fieldName, String value) {
        return (root, query, cb) -> {
            if (value == null || value.isEmpty()) return null;
            String lowerCaseValue = value.toLowerCase(Locale.of("tr", "TR"));
            return cb.like(cb.lower(root.get(fieldName)), "%" + lowerCaseValue + "%");
        };
    }

}
