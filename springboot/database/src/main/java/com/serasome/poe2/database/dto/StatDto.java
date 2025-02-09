package com.serasome.poe2.database.dto;

import com.serasome.poe2.database.entity.Stat;
import com.serasome.poe2.database.entity.MappingStatValue;

import lombok.Data;

@Data
public class StatDto {
    private Long id;
    private String contents;
    private MappingStatValueDto values;

    public StatDto(Stat stat) {
        this.id = stat.getId();
        this.contents = stat.getContents();
    }

    public StatDto(Stat stat, MappingStatValue values) {
        this.id = stat.getId();
        this.contents = stat.getContents();

        if (values != null) {
            this.values = new MappingStatValueDto(values);
        }
    }
}
