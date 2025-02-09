package com.serasome.poe2.database.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serasome.poe2.database.entity.User;
import com.serasome.poe2.database.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }

    @Transactional
    public User setUser(String account) {
        Optional<User> existingUser = userRepository.findByAccount(account);

        if (existingUser.isPresent()) {
            return userRepository.findById(existingUser.get().getId()).get();
        }

        User user = new User();
        user.setAccount(account);

        return userRepository.save(user);
    }
}
