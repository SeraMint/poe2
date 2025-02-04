package com.serasome.poe2.database.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.dto.ItemDto;
import com.serasome.poe2.database.entity.Item;
import com.serasome.poe2.database.repository.ItemRepository;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public Page<ItemDto> getAllItems(Pageable pageable) {
        return itemRepository.findAllWithTags(pageable).map(ItemDto::new);
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
