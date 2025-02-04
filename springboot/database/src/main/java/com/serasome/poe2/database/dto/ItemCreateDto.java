package com.serasome.poe2.database.dto;

import java.util.List;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ItemCreateDto {
    @Pattern(regexp = "^[a-z]{1,128}$", message = "잘못된 카테고리 아이디 입니다.")
    private String categoryId;

    private List<@Pattern(regexp = "^[0-9가-힣\\#\\-\\% ]{1,256}$", message = "잘못된 능력치 형식입니다.") String> stats;

    private List<@Pattern(regexp = "^[가-힣]{1,128}$", message = "잘못된 태그 형식입니다.") String> tagNames;
}
