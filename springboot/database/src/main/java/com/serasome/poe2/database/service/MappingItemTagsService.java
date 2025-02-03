package com.serasome.poe2.database.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serasome.poe2.database.entity.MappingItemTags;
import com.serasome.poe2.database.repository.ItemRepository;
import com.serasome.poe2.database.repository.MappingItemTagsRepository;
import com.serasome.poe2.database.repository.TagRepository;

@Service
public class MappingItemTagsService {
    @Autowired
    private MappingItemTagsRepository mappingItemTagsRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private TagRepository tagRepository;

    public MappingItemTags setMappingItemTags(Long itemId, Long tagId) {
        Optional<MappingItemTags> findMappingItemTags = mappingItemTagsRepository.findByItemIdAndTagId(itemId,
                tagId);
        if (!findMappingItemTags.isPresent()) {
            MappingItemTags mappingItemTags = new MappingItemTags();
            mappingItemTags.setItem(itemRepository.findById(itemId).get());
            mappingItemTags.setTag(tagRepository.findById(tagId).get());
            mappingItemTagsRepository.save(mappingItemTags);

            return mappingItemTags;
        }

        return findMappingItemTags.get();
    }
}
