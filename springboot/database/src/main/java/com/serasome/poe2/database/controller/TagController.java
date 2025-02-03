package com.serasome.poe2.database.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serasome.poe2.database.entity.Tag;
import com.serasome.poe2.database.service.TagService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/tag")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("list")
    public List<Tag> getTags() {
        return tagService.getAllTags();
    }

    @PostMapping("add")
    public Tag setTag(@RequestBody Tag newTag) {
        Tag tag = new Tag();
        tag.setName(newTag.getName());
        tagService.setTag(tag);

        return tag;
    }
}
