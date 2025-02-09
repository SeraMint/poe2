package com.serasome.poe2.database.entity;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "mapping_item_stats", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "item_id", "stat_id" })
})
@Data
@NoArgsConstructor
public class MappingItemStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stat_id", nullable = false)
    private Stat stat;

    @OneToOne(mappedBy = "mappingItemStats", cascade = CascadeType.ALL, orphanRemoval = true)
    private MappingStatValue values;

    private String role;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}