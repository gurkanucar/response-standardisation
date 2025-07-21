# API Response Standardization with Spring Boot & React

An example of standardized API responses, internationalized exception handling, and frontend integration using Spring Boot backend with React frontend.

## Features

- **Standardized API Responses**: Consistent response structure across all endpoints
- **Internationalization (i18n)**: Multi-language support with automatic locale detection
- **Exception Handling**: Centralized exception management with custom business error codes
- **Validation Error Handling**: Structured validation error responses
- **Request Tracing**: Unique trace IDs for request tracking and debugging
- **Frontend Integration**: Axios interceptor for automatic language header sending and error handling

## Response Structure

### Success Response
```json
{
    "error": false,
    "traceId": "683d9f681a57db4ef3e5aa046856dfb7",
    "message": "Operation successfully completed",
    "data": {
        "id": 1,
        "email": "johndoe@example.com"
    }
}
```

### Paginated Response
```json
{
    "error": false,
    "traceId": "683d9f681a57db4ef3e5aa046856dfb7",
    "message": "Data retrieved successfully",
    "data": {
        "content": [
            {
                "id": 1,
                "email": "johndoe@example.com"
            }
        ],
        "pageable": {
            "totalElements": 1,
            "numberOfElements": 1,
            "totalPages": 1,
            "size": 30,
            "last": true,
            "first": true,
            "empty": false
        }
    }
}
```

### Error Response
```json
{
    "error": true,
    "traceId": "683d9f681a57db4ef3e5aa046856dfb7",
    "businessErrorCode": 1004,
    "message": "You have validation errors!",
    "validationErrors": {
        "field1": "error1",
        "field2": "error2"
    }
}
```

## Backend Implementation

### Controller Example

Controllers use the standardized `ApiResponse` wrapper to ensure consistent response formatting:

```java
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "Create a new product",
            description = "This api creates a new product and return created product"
    )
    @PostMapping
    public ResponseEntity<ApiResponse<ProductDto>> createProduct(@Valid @RequestBody ProductCreateRequest request) {
        var createdProduct = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(createdProduct));
    }
}
```

### Global Exception Handler

The `@RestControllerAdvice` centralizes exception handling and ensures all errors follow the standardized response format:

```java
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<ApiResponse<Object>> handleCustomException(BusinessException exception) {
        log.warn("Business exception occurred: {}", exception.getMessage());
        ApiResponse<Object> response = ApiResponse.error(
                exception.getBusinessErrorCode(),
                exception.getMessage(),
                null);
        return new ResponseEntity<>(response, exception.getStatus());
    }
    ...
}
```

### Exception Message Enum

The `ExceptionMessage` enum centralizes all exception definitions with their corresponding HTTP status codes and business error codes:

```java
@Getter
public enum ExceptionMessage {
    DEFAULT_EXCEPTION("messages.error.default_message", HttpStatus.BAD_REQUEST, 1000),
    ALREADY_EXISTS_EXCEPTION("messages.error.already_exists_exception", HttpStatus.CONFLICT, 1001),
    PRODUCT_NOT_FOUND_EXCEPTION("messages.error.product_not_found_exception", HttpStatus.NOT_FOUND, 1002);

    private final String key;
    private final HttpStatus status;
    private final int businessErrorCode;

    ExceptionMessage(String key, HttpStatus httpStatus, int businessErrorCode) {
        this.key = key;
        this.status = httpStatus;
        this.businessErrorCode = businessErrorCode;
    }
}
```

### Usage Examples

**Validation Check:**
```java
if (productRepository.existsByNameIgnoreCase(productRequest.name())) {
    throw buildException(ExceptionMessage.ALREADY_EXISTS_EXCEPTION);
}
```

**Entity Retrieval:**
```java
public Product getProduct(Long id) {
    return productRepository.findById(id)
            .orElseThrow(() -> buildException(ExceptionMessage.PRODUCT_NOT_FOUND_EXCEPTION, id));
}
```

### Internationalization Configuration

The `MessageConfig` handles locale resolution based on the `Accept-Language` header:

```java
@Configuration
public class MessageConfig implements WebMvcConfigurer {

    @Bean
    public LocaleResolver localeResolver() {
        return new AcceptHeaderLocaleResolver() {
            @Override
            @NonNull
            public Locale resolveLocale(@NonNull HttpServletRequest request) {
                String acceptLanguageHeader = request.getHeader("Accept-Language");
                return acceptLanguageHeader != null
                        ? Locale.forLanguageTag(acceptLanguageHeader)
                        : Locale.of("tr", "TR");
            }
        };
    }
}
```

## Frontend Integration

### Axios Interceptor

The React frontend automatically sends the user's preferred language in API requests:

```javascript
axiosInstance.interceptors.request.use(
    (config) => {
        const language = useUIStore.getState().language;
        if (language) {
            config.headers['Accept-Language'] = language;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
```

## Project Structure

```
├── backend/
│   ├── src/main/java/
│   │   ├── config/
│   │   │   └── MessageConfig.java
│   │   ├── controller/
│   │   │   └── ProductController.java
│   │   ├── enums/
│   │   │   └── ExceptionMessage.java
│   │   ├── exception/
│   │   │   ├── BusinessException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── dto/
│   │   │   ├── ProductDto.java
│   │   │   ├── ProductCreateRequest.java
│   │   │   └── ApiResponse.java
│   │   └── service/
│   │       └── ProductService.java
│   └── src/main/resources/
│       ├── messages.properties
│       └── messages_tr.properties
└── frontend/
    ├── src/
    │   ├── interceptors/
    │   │   └── axiosInterceptor.js
    │   └── store/
    │       └── uiStore.js
    └── package.json
```

## Configuration

### Message Properties Files

Create message property files for different languages:

**messages.properties (default)**
```properties
messages.error.default_message=An error occurred
messages.error.already_exists_exception=Resource already exists
messages.error.product_not_found_exception=Product not found
```

**messages_tr.properties**
```properties
messages.error.default_message=Bir hata oluştu
messages.error.already_exists_exception=Kaynak zaten mevcut
messages.error.product_not_found_exception=Ürün bulunamadı
messages.error.validation_error=Doğrulama hatalarınız var!
```

### ApiResponse Wrapper Class

The standardized response wrapper ensures all API responses have the same structure:

```java
@JsonPropertyOrder({
        "error",
        "traceId",
        "businessErrorCode",
        "message",
        "data",
        "validationErrors",
})
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Builder
public class ApiResponse<T> {

    // Define the default message keys
    private static final String DEFAULT_SUCCESS_KEY = "messages.default.success";
    private static final String DEFAULT_ERROR_KEY = "messages.default.error";

    // Common fields
    private Boolean error;
    private String message;
    @Builder.Default
    private String traceId = MDC.get("traceId");

    // Success response field
    private T data;

    // Error response fields
    private Integer businessErrorCode;
    private Map<String, String> validationErrors;

    public static <T> ApiResponse<T> success(T data) {
        return success(data, DEFAULT_SUCCESS_KEY);
    }

    public static <T> ApiResponse<T> success(T data, String messageKey) {
        return ApiResponse.<T>builder()
                .error(false)
                .message(MessageUtil.getMessage(messageKey))
                .data(data)
                .build();
    }

    public static <U> ApiResponse<PageableResponse<U>> success(Page<U> page) {
        return success(page, DEFAULT_SUCCESS_KEY);
    }

    public static <U> ApiResponse<PageableResponse<U>> success(Page<U> page, String messageKey) {
        PageDetails pageDetails = PageDetails.builder()
                .totalElements(page.getTotalElements())
                .numberOfElements(page.getNumberOfElements())
                .totalPages(page.getTotalPages())
                .size(page.getSize())
                .last(page.isLast())
                .first(page.isFirst())
                .empty(page.isEmpty())
                .build();

        PageableResponse<U> pageableResponse = PageableResponse.<U>builder()
                .content(page.getContent())
                .pageable(pageDetails)
                .build();

        return ApiResponse.<PageableResponse<U>>builder()
                .error(false)
                .message(MessageUtil.getMessage(messageKey))
                .data(pageableResponse)
                .build();
    }

    public static ApiResponse<Object> successWithEmptyData() {
        return successWithEmptyData(DEFAULT_SUCCESS_KEY);
    }

    public static ApiResponse<Object> successWithEmptyData(String messageKey) {
        return ApiResponse.builder()
                .error(false)
                .message(MessageUtil.getMessage(messageKey))
                .data(null)
                .build();
    }

    public static ApiResponse<Object> error(Integer businessErrorCode, Map<String, String> validationErrors) {
        return error(DEFAULT_ERROR_KEY, businessErrorCode, validationErrors);
    }

    public static ApiResponse<Object> error(String messageKey, Integer businessErrorCode,
                                            Map<String, String> validationErrors) {
        return ApiResponse.builder()
                .error(true)
                .message(MessageUtil.getMessage(messageKey))
                .businessErrorCode(businessErrorCode)
                .validationErrors(validationErrors)
                .build();
    }

    public static ApiResponse<Object> error(Integer businessErrorCode, String customMessage,
                                            Map<String, String> validationErrors) {
        return ApiResponse.builder()
                .error(true)
                .message(customMessage)
                .businessErrorCode(businessErrorCode)
                .validationErrors(validationErrors)
                .build();
    }


}
```
