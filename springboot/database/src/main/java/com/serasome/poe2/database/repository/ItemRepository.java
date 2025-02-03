package com.serasome.poe2.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.serasome.poe2.database.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT i FROM items i JOIN FETCH i.mappingItemTags mit JOIN FETCH mit.tag")
    List<Item> findAllWithTags();
}
