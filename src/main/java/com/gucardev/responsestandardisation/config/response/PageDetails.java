package com.gucardev.responsestandardisation.config.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public  class PageDetails {
    private long totalElements;
    private int numberOfElements;
    private int totalPages;
    private int size;
    private boolean last;
    private boolean first;
    private boolean empty;
}
