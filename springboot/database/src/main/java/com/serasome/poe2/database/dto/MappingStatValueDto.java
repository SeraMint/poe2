package com.serasome.poe2.database.dto;

import com.serasome.poe2.database.entity.MappingStatValue;

import lombok.Data;

@Data
public class MappingStatValueDto {
    private int value1;
    private int value2;
    private int value3;
    private int value4;
    private int value5;

    public MappingStatValueDto(MappingStatValue value) {
        this.value1 = value.getValue1();
        this.value2 = value.getValue2();
        this.value3 = value.getValue3();
        this.value4 = value.getValue4();
        this.value5 = value.getValue5();
    }
}
