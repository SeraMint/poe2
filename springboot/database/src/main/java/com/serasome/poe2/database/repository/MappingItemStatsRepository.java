package com.serasome.poe2.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.serasome.poe2.database.entity.MappingItemStats;

public interface MappingItemStatsRepository extends JpaRepository<MappingItemStats, Long> {
    Optional<MappingItemStats> findByItemIdAndStatId(Long itemId, Long statId);

    List<MappingItemStats> findByItemId(Long itemId);

    List<MappingItemStats> findByStatId(Long itemId);
}
