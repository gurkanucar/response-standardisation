package com.gucardev.responsestandardisation.config.exception;

import com.gucardev.responsestandardisation.config.message.MessageUtil;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class ExceptionUtil {

    public static BusinessException buildException() {
        return buildException(ExceptionMessage.DEFAULT_EXCEPTION);
    }

    public static BusinessException buildException(ExceptionMessage ex, Object... args) {
        String errorMessage = MessageUtil.getMessage(ex.getKey(), args);
        return new BusinessException(errorMessage, ex.getStatus(), ex.getBusinessErrorCode());
    }

    public static BusinessException buildException(ExceptionMessage ex) {
        String errorMessage = MessageUtil.getMessage(ex.getKey());
        return new BusinessException(errorMessage, ex.getStatus(), ex.getBusinessErrorCode());
    }

}