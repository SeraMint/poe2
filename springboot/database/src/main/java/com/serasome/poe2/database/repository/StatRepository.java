package com.serasome.poe2.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.entity.Stat;

public interface StatRepository extends JpaRepository<Stat, Long> {
    Optional<Stat> findByContents(String contents);

    @Modifying
    @Transactional
    @Query("UPDATE Stat SET used = used + 1 WHERE id = :statId")
    public void incrementUsedCount(@Param("statId") Long statId);
}
