package com.serasome.poe2.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.serasome.poe2.database.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT DISTINCT i " +
            "FROM Item i " +
            "JOIN i.category c " +
            "LEFT JOIN i.mappingItemStats mis ON i.id = mis.item.id " +
            "LEFT JOIN mis.stat " +
            "LEFT JOIN i.mappingItemTags mit ON i.id = mit.item.id " +
            "LEFT JOIN mit.tag")
    Page<Item> findAllWithTags(Pageable pageable);
}

// public interface ItemRepository extends JpaRepository<Item, Long> {
// @Query("SELECT i FROM Item i JOIN FETCH i.mappingItemTags mit JOIN FETCH
// mit.tag")
// Page<Item> findAllWithTags(Pageable pageable);
// }