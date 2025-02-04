package com.serasome.poe2.database.dto;

import com.serasome.poe2.database.entity.Stat;

import lombok.Data;

@Data
public class StatDto {
    private Long id;
    private String contents;

    public StatDto(Stat stat) {
        this.id = stat.getId();
        this.contents = stat.getContents();
    }
}
