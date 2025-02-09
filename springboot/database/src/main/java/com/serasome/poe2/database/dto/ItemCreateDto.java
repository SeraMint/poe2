package com.serasome.poe2.database.dto;

import java.util.List;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ItemCreateDto {
    @Pattern(regexp = "^[a-zA-Z0-9가-힣\\-\\_]{1,}#[0-9]{1,}$", message = "'${validatedValue}'은(는) 잘못된 계정명 입니다.")
    private String account;

    @Size(min = 1, message = "최소 한 개의 능력치가 필요합니다.")
    private List<@Pattern(regexp = "^[a-zA-Z가-힣\\#\\+\\-\\%\\.\\,\\(\\) ]{1,256}$", message = "'${validatedValue}'은(는) 잘못된 능력치 형식입니다.") String> stats;

    private List<List<Integer>> values;
}
