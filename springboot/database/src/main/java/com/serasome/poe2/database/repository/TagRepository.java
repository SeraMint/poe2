package com.serasome.poe2.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);

    @Modifying
    @Transactional
    @Query("UPDATE tags SET used = used + 1 WHERE id = :tagId")
    public void incrementUsedCount(@Param("tagId") Long tagId);
}
