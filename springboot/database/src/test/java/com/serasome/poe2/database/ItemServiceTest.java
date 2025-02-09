package com.serasome.poe2.database;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestReporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.serasome.poe2.database.entity.Item;
import com.serasome.poe2.database.entity.User;
import com.serasome.poe2.database.service.ItemService;
import com.serasome.poe2.database.service.UserService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class ItemServiceTest {
    @Autowired
    private ItemService itemService;

    @Autowired
    private UserService userService;

    @BeforeEach
    public void before() {
        System.out.println("Item Service Test Start");
    }

    @AfterEach
    public void after() {
        System.out.println("Item Service Test End");
    }

    @Test
    @DisplayName("Create Item Test")
    public void test(TestReporter testReporter) throws Exception {
        // Given
        User newUser = userService.setUser("테스트#12345");

        // Then
        if (newUser.getId() != null) {
            testReporter.publishEntry("사용자 생성 성공!");
        }
        assertTrue(newUser.getId() != null, "사용자 생성 실패...");

        // Given
        Item newItem = new Item();
        newItem.setUser(newUser);

        // When
        Item item = itemService.createItem(newItem);

        // Then
        if (item.getId() != null) {
            testReporter.publishEntry("아이템 생성 성공!");
        }
        assertTrue(item.getId() != null, "아이템 생성 실패...");
    }
}
