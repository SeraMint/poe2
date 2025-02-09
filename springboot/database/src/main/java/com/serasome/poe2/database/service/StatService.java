package com.serasome.poe2.database.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.dto.StatDto;
import com.serasome.poe2.database.entity.Stat;
import com.serasome.poe2.database.repository.StatRepository;

import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;

@Service
public class StatService {

    @Autowired
    private StatRepository statRepository;

    @Autowired
    private Komoran komoran;

    private final String[] filterArray = { "NNG", "NNP", "NNB" };
    private final Set<String> filterSet = Set.of(filterArray);

    public List<StatDto> getAllStats() {
        return statRepository.findAll()
                .stream()
                .map(StatDto::new)
                .collect(Collectors.toList());
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

    public Set<String> analyzeStat(Stat stat) {
        KomoranResult analyzeResult = komoran.analyze(stat.getContents());

        Set<String> tagNames = analyzeResult.getTokenList().stream()
                .filter(token -> filterSet.contains(token.getPos())).map(token -> token.getMorph())
                .collect(Collectors.toCollection(HashSet::new));

        return tagNames;
    }

}
