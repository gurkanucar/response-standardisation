package com.gucardev.responsestandardisation.config.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public  class PageableResponse<U> {
    private List<U> content;
    private PageDetails pageable;
}
