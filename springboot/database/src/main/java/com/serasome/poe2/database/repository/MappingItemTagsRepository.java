package com.serasome.poe2.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.serasome.poe2.database.entity.MappingItemTags;

public interface MappingItemTagsRepository extends JpaRepository<MappingItemTags, Long> {
    Optional<MappingItemTags> findByItemIdAndTagId(Long itemId, Long tagId);

    List<MappingItemTags> findByItemId(Long itemId);

    List<MappingItemTags> findByTagId(Long itemId);
}
