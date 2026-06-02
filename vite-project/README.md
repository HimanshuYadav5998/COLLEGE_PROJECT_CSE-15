# Full-Stack Netflix Clone

Built a full-stack Netflix clone featuring user registration, a responsive homepage, and a robust backend designed to track user streaming activity and log view counts for specific movies.

## 📁 Project Structure

### Frontend (React/Vite)
The user interface is built using React, handling routing, user authentication views, and media browsing.

```text
Netflix-clone/
└── src/
    ├── App.jsx
    ├── App.css
    ├── Browse.jsx
    ├── Register.jsx
    ├── main.jsx
    └── index.css

### Backend (Spring Boot)

```text
Demo/
└── src/main/java/com/example/demo/
    ├── DemoApplication.java  # Main application entry point
    ├── MovieClick.java       # Entity model for tracking movie data
    ├── ClickRepository.java  # Repository interface for database queries
    └── StatsController.java  # REST API controller for handling analytics endpoints
