package com.serasome.poe2.database.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.entity.Stat;
import com.serasome.poe2.database.repository.StatRepository;

@Service
public class StatService {

    @Autowired
    private StatRepository statRepository;

    public List<Stat> getAllStats() {
        return statRepository.findAll();
    }

    @Transactional
    public Stat setStat(Stat stat) {
        Optional<Stat> existingStat = statRepository.findByContents(stat.getContents());

        if (existingStat.isPresent()) {
            statRepository.incrementUsedCount(existingStat.get().getId());

            return statRepository.findById(existingStat.get().getId()).get();
        }

        return statRepository.save(stat);
    }

}
