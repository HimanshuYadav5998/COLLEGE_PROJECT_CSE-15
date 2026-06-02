package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class MovieClick {
    
    @Id
    private String movieTitle;
    private int clickCount;

    // Empty constructor required by JPA
    public MovieClick() {}

    public MovieClick(String movieTitle, int clickCount) {
        this.movieTitle = movieTitle;
        this.clickCount = clickCount;
    }

    public String getMovieTitle() { return movieTitle; }
    public void setMovieTitle(String movieTitle) { this.movieTitle = movieTitle; }
    
    public int getClickCount() { return clickCount; }
    public void setClickCount(int clickCount) { this.clickCount = clickCount; }
}