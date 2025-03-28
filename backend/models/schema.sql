CREATE DATABASE neetquizdb;
USE neetquizdb;

-- User Authentication Table
CREATE TABLE users_auth (
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(500) NOT NULL
);

-- User Statistics Table
CREATE TABLE user_stats (
    user_id INT NOT NULL ,
    total_points INT DEFAULT 0,  -- Default total points to 0
    current_rank INT DEFAULT NULL, 
    highest_rank INT DEFAULT NULL, 
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users_auth(user_id) ON DELETE CASCADE
);

-- High Scores Table (Per Subject)
CREATE TABLE high_scores (
    user_id INT NOT NUll,
    subject_id VARCHAR(10) NOT NULL,
    scores INT DEFAULT 0, -- Default score to 0
    PRIMARY KEY (user_id, subject_id),
    FOREIGN KEY (user_id) REFERENCES users_auth(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- User Activity Log
CREATE TABLE user_activity_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    subject_id VARCHAR(10) NOT NULL,
    chapter_id VARCHAR(10) NOT NULL,
    score INT DEFAULT 0,  -- Default score to 0
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auto-set timestamp
    FOREIGN KEY (user_id) REFERENCES users_auth(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE
);

-- Subjects Table
CREATE TABLE subjects (
    subject_id VARCHAR(10) PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL UNIQUE
);

-- Chapters Table
CREATE TABLE chapters (
    chapter_id VARCHAR(10) PRIMARY KEY,
    chapter_name VARCHAR(255) NOT NULL,
    subject_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- Quiz Questions Table
CREATE TABLE quiz_questions (
    question_id VARCHAR(10) PRIMARY KEY,
    subject_id VARCHAR(10) NOT NULL,
    chapter_id VARCHAR(10) NOT NULL,
    question VARCHAR(1000) NOT NULL,
    difficulty_level ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy', -- Default difficulty to 'Easy'
    answer VARCHAR(1000) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE
);

-- Quiz Choices Table
CREATE TABLE quiz_choices (
    choice_id VARCHAR(10) PRIMARY KEY,
    question_id VARCHAR(10) NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id) ON DELETE CASCADE
);
