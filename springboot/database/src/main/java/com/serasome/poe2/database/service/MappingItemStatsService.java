package com.serasome.poe2.database.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serasome.poe2.database.entity.MappingItemStats;
import com.serasome.poe2.database.repository.ItemRepository;
import com.serasome.poe2.database.repository.MappingItemStatsRepository;
import com.serasome.poe2.database.repository.StatRepository;

@Service
public class MappingItemStatsService {
    @Autowired
    private MappingItemStatsRepository mappingItemStatsRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StatRepository statRepository;

    public MappingItemStats setMappingItemStats(Long itemId, Long statId) {
        Optional<MappingItemStats> findMappingItemStats = mappingItemStatsRepository.findByItemIdAndStatId(itemId,
                statId);
        if (!findMappingItemStats.isPresent()) {
            MappingItemStats mappingItemStats = new MappingItemStats();
            mappingItemStats.setItem(itemRepository.findById(itemId).get());
            mappingItemStats.setStat(statRepository.findById(statId).get());
            mappingItemStatsRepository.save(mappingItemStats);

            return mappingItemStats;
        }

        return findMappingItemStats.get();
    }
}
