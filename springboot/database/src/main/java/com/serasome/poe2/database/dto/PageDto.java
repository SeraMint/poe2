package com.serasome.poe2.database.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;

@Getter
public class PageDto<T> {
    private List<T> content;
    private long totalRows;
    private int totalPages;

    public PageDto(Page<T> page) {
        this.content = page.getContent();
        this.totalRows = page.getTotalElements();
        this.totalPages = page.getTotalPages();
    }
}
