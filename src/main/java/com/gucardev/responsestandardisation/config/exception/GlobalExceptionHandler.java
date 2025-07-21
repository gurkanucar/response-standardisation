package com.gucardev.responsestandardisation.config.exception;

import com.gucardev.responsestandardisation.config.message.MessageUtil;
import com.gucardev.responsestandardisation.config.response.ApiResponse;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.PersistenceException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Hidden // for openapi doc
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<ApiResponse<Object>> handleCustomException(BusinessException exception) {
        log.warn("Business exception occurred: {}", exception.getMessage());
        ApiResponse<Object> response = ApiResponse.error(
                exception.getBusinessErrorCode(),
                exception.getMessage(),
                null);
        return new ResponseEntity<>(response, exception.getStatus());
    }

    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<ApiResponse<Object>> noResourceFoundException(NoResourceFoundException exception) {
        log.warn("Resource not found: {}", exception.getMessage());
        HttpStatus status = HttpStatus.NOT_FOUND;
        ApiResponse<Object> response = ApiResponse.error(
                status.value(),
                MessageUtil.getMessage("error.resource.not.found"),
                null);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public final ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidEx(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = extractFieldErrors(ex);
        log.warn("Validation failed: {}", errors);
        ApiResponse<Object> response = ApiResponse.error("validation.failed",
                ExceptionMessage.DEFAULT_EXCEPTION.getBusinessErrorCode(),
                errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public final ResponseEntity<ApiResponse<Object>> handleConstraintViolationEx(
            ConstraintViolationException ex) {
        Map<String, String> errors = extractConstraintViolations(ex);
        log.warn("Constraint violation: {}", errors);
        ApiResponse<Object> response = ApiResponse.error("validation.failed",
                ExceptionMessage.DEFAULT_EXCEPTION.getBusinessErrorCode(),
                errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({Exception.class})
    public final ResponseEntity<ApiResponse<Object>> handleAllException(Exception ex) {
        String message;
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        int errorCode = ExceptionMessage.DEFAULT_EXCEPTION.getBusinessErrorCode();

        if (isDatabaseException(ex)) {
            log.error("Database exception occurred: ", ex);
            message = MessageUtil.getMessage("database.error");
        } else {
            log.error("Unhandled exception occurred: ", ex);
            message = MessageUtil.getMessage("default.error");
        }

        ApiResponse<Object> response = ApiResponse.error(errorCode, message, null);
        return new ResponseEntity<>(response, status);
    }

    private Map<String, String> extractFieldErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = (error instanceof FieldError) ? ((FieldError) error).getField() : error.getObjectName();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    private Map<String, String> extractConstraintViolations(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    private boolean isDatabaseException(Throwable ex) {
        Throwable cause = ex;
        while (cause != null) {
            if (cause instanceof SQLException ||
                    cause instanceof DataAccessException ||
                    cause instanceof PersistenceException) {
                return true;
            }
            cause = cause.getCause();
        }
        return false;
    }
}
