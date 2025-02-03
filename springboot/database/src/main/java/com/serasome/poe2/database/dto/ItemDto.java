package com.serasome.poe2.database.dto;

import java.util.List;
import lombok.Data;

@Data
public class ItemDto {
    private Long id;
    private List<TagDto> tags;

    // 생성자
    public ItemDto(Long id, List<TagDto> tags) {
        this.id = id;
        this.tags = tags;
    }
}
