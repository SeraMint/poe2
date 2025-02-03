package com.serasome.poe2.database.dto;

import lombok.Data;

@Data
public class TagDto {
    private Long id;
    private String name;

    public TagDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
