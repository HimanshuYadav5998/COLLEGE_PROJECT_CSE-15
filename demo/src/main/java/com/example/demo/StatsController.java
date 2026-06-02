package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:5173") // Allows Vite/React to connect
public class StatsController {

    private final ClickRepository repository;

    public StatsController(ClickRepository repository) {
        this.repository = repository;
    }

    // Receives the click from React
    @PostMapping("/click")
    public MovieClick recordClick(@RequestBody MovieClick clickRequest) {
        // Check if movie exists in DB. If yes, add 1. If no, create it with 0 clicks.
        MovieClick existing = repository.findById(clickRequest.getMovieTitle())
                .orElse(new MovieClick(clickRequest.getMovieTitle(), 0));
        
        existing.setClickCount(existing.getClickCount() + 1);
        return repository.save(existing);
    }

    // Optional: Get all stats at once
    @GetMapping("/all")
    public List<MovieClick> getAllStats() {
        return repository.findAll();
    }
}