package com.serasome.poe2.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "mapping_stat_values")
public class MappingStatValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "mapping_item_stats_id", unique = true, nullable = false)
    private MappingItemStats mappingItemStats;

    @Column
    private int value1;

    @Column
    private int value2;

    @Column
    private int value3;

    @Column
    private int value4;

    @Column
    private int value5;
}
