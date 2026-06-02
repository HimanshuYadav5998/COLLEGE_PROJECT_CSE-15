package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClickRepository extends JpaRepository<MovieClick, String> {
}