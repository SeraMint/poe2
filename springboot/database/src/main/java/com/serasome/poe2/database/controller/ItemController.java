package com.serasome.poe2.database.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serasome.poe2.database.dto.ItemDto;
import com.serasome.poe2.database.entity.Item;
import com.serasome.poe2.database.entity.Tag;
import com.serasome.poe2.database.service.ItemService;
import com.serasome.poe2.database.service.MappingItemTagsService;
import com.serasome.poe2.database.service.TagService;

@RestController
@RequestMapping("/api/item")
public class ItemController {
    private final ItemService itemService;
    private final TagService tagService;
    private final MappingItemTagsService mappingItemTagsService;

    public ItemController(ItemService itemService, TagService tagService,
            MappingItemTagsService mappingItemTagsService) {
        this.itemService = itemService;
        this.tagService = tagService;
        this.mappingItemTagsService = mappingItemTagsService;
    }

    @GetMapping("list")
    public List<ItemDto> getItems() {
        return itemService.getAllItems();
    }

    @PostMapping("create")
    public Item createItem(@RequestBody List<String> tagNames) {
        Set<Long> tagIds = new HashSet<>();
        tagNames.forEach(tagName -> {
            Tag newTag = new Tag();
            newTag.setName(tagName);
            tagIds.add(tagService.setTag(newTag).getId());
        });
        Item item = new Item();

        item.setId(itemService.createItem(item).getId());

        tagIds.forEach(tagId -> {
            mappingItemTagsService.setMappingItemTags(item.getId(), tagId);
        });

        return item;
    }
}
