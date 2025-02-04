package com.serasome.poe2.database.dto;

import com.serasome.poe2.database.entity.Tag;

import lombok.Data;

@Data
public class TagDto {
    private Long id;
    private String name;

    public TagDto(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }
}
