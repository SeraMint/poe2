package com.serasome.poe2.database.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serasome.poe2.database.dto.StatDto;
import com.serasome.poe2.database.service.StatService;

@RestController
@RequestMapping("/api/stat")
public class StatController {
    private final StatService statService;

    public StatController(StatService statService) {
        this.statService = statService;
    }

    @GetMapping("list")
    public List<StatDto> getStats() {
        return statService.getAllStats();
    }
}
