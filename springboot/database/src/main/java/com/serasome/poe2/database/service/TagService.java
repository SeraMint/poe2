package com.serasome.poe2.database.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.entity.Tag;
import com.serasome.poe2.database.repository.TagRepository;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Transactional
    public Tag setTag(Tag tag) {
        Optional<Tag> existingTag = tagRepository.findByName(tag.getName());

        if (existingTag.isPresent()) {
            tagRepository.incrementUsedCount(existingTag.get().getId());

            return tagRepository.findById(existingTag.get().getId()).get();
        }

        return tagRepository.save(tag);
    }

}
