package com.serasome.poe2.database.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.dto.ItemDto;
import com.serasome.poe2.database.dto.TagDto;
import com.serasome.poe2.database.entity.Item;
import com.serasome.poe2.database.repository.ItemRepository;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public List<ItemDto> getAllItems() {
        return itemRepository.findAllWithTags()
                .stream()
                .map(item -> new ItemDto(item.getId(), item.getMappingItemTags()
                        .stream().map(mapping -> new TagDto(mapping.getTag().getId(), mapping.getTag().getName()))
                        .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    @Transactional
    public Item createItem(Item item) {
        Optional<Item> existingItem = itemRepository.findById(item.getId() != null ? item.getId() : 0);

        if (existingItem.isPresent()) {
            return existingItem.get();
        }

        return itemRepository.save(item);
    }
}
