package com.serasome.poe2.database.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.serasome.poe2.database.entity.Item;

import lombok.Data;

@Data
public class ItemDto {
    private Long id;
    private String categoryId;
    private List<StatDto> stats;
    private List<TagDto> tags;

    public ItemDto(Item item) {
        this.id = item.getId();
        this.categoryId = item.getCategory().getId();
        this.stats = item.getMappingItemStats().stream().map(mapper -> mapper.getStat()).map(StatDto::new)
                .collect(Collectors.toList());
        this.tags = item.getMappingItemTags().stream().map(mapper -> mapper.getTag()).map(TagDto::new)
                .collect(Collectors.toList());
    }
}
