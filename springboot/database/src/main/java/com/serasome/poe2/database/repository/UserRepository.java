package com.serasome.poe2.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.serasome.poe2.database.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccount(String account);
}
