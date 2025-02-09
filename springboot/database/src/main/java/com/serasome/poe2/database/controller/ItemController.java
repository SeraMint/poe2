package com.serasome.poe2.database.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serasome.poe2.database.dto.ItemCreateDto;
import com.serasome.poe2.database.dto.ItemDto;
import com.serasome.poe2.database.dto.PageDto;
import com.serasome.poe2.database.dto.PageParamDto;
import com.serasome.poe2.database.entity.Item;
import com.serasome.poe2.database.entity.Stat;
import com.serasome.poe2.database.entity.Tag;
import com.serasome.poe2.database.entity.User;
import com.serasome.poe2.database.service.ItemService;
import com.serasome.poe2.database.service.MappingItemStatsService;
import com.serasome.poe2.database.service.MappingItemTagsService;
import com.serasome.poe2.database.service.StatService;
import com.serasome.poe2.database.service.TagService;
import com.serasome.poe2.database.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/item")
public class ItemController {
    private final ItemService itemService;
    private final StatService statService;
    private final MappingItemStatsService mappingItemStatsService;
    private final TagService tagService;
    private final MappingItemTagsService mappingItemTagsService;
    private final UserService userService;

    public ItemController(ItemService itemService, StatService statService,
            MappingItemStatsService mappingItemStatsService, TagService tagService,
            MappingItemTagsService mappingItemTagsService, UserService userService) {
        this.itemService = itemService;
        this.statService = statService;
        this.mappingItemStatsService = mappingItemStatsService;
        this.tagService = tagService;
        this.mappingItemTagsService = mappingItemTagsService;
        this.userService = userService;
    }

    @GetMapping("list")
    public PageDto<ItemDto> getItems(@RequestBody(required = false) PageParamDto param) {
        if (param == null) {
            param = new PageParamDto();
        }

        Pageable pageable = PageRequest.of(param.getPage(), param.getRows());
        return new PageDto<>(itemService.getAllItems(pageable));
    }

    @PostMapping("create")
    public ItemDto createItem(@Valid @RequestBody ItemCreateDto param) {
        Set<Long> tagIds = new HashSet<>();
        Set<String> tagNames = new HashSet<>();
        Set<Long> statIds = new HashSet<>();

        param.getStats().forEach(stat -> {
            Stat newStat = new Stat();
            newStat.setContents(stat);
            statIds.add(statService.setStat(newStat).getId());
            System.out.println(statService.analyzeStat(newStat));
            tagNames.addAll(statService.analyzeStat(newStat));
        });

        tagNames.forEach(tagName -> {
            Tag newTag = new Tag();
            newTag.setName(tagName);
            tagIds.add(tagService.setTag(newTag).getId());
        });

        User user = userService.setUser(param.getAccount());
        Item item = new Item();

        item.setUser(user);
        item.setId(itemService.createItem(item).getId());

        statIds.forEach(statId -> {
            mappingItemStatsService.setMappingItemStats(item.getId(), statId);
        });

        tagIds.forEach(tagId -> {
            mappingItemTagsService.setMappingItemTags(item.getId(), tagId);
        });

        return new ItemDto(item);
    }
}
