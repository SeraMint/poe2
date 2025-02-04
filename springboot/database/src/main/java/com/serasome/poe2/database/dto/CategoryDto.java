package com.serasome.poe2.database.dto;

import com.serasome.poe2.database.entity.Category;

import lombok.Data;

@Data
public class CategoryDto {
    private String id;
    private String name;

    public CategoryDto(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}
