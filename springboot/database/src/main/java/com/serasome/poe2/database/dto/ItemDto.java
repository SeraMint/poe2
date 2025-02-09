package com.serasome.poe2.database.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.serasome.poe2.database.entity.Item;

import lombok.Data;

@Data
public class ItemDto {
    private Long id;
    private List<StatDto> stats;
    private List<TagDto> tags;

    public ItemDto(Item item) {
        this.id = item.getId();
        this.stats = item.getMappingItemStats().stream()
                .map(mapper -> new StatDto(mapper.getStat(), mapper.getValues()))
                .collect(Collectors.toList());
        this.tags = item.getMappingItemTags().stream().map(mapper -> new TagDto(mapper.getTag()))
                .collect(Collectors.toList());
    }
}
