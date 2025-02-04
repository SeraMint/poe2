package com.serasome.poe2.database.dto;

import lombok.Data;

@Data
public class PageParamDto {
    private int page = 0;
    private int rows = 100;
}
