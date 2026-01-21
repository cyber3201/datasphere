-- DataSphere Full Database Setup for Neon PostgreSQL
-- This script initializes the database and creates all necessary tables, triggers, and indexes.

/*
  NOTE FOR NEON USERS:
  In Neon, you typically create the database via the Neon Console UI. 
  However, if you are running this in a SQL editor where you have permissions, 
  the following block will attempt to create the database.
  If it fails because the database already exists or due to permission limits, 
  simply switch to your target database and run the rest of the script.
*/

-- 1. Database Initialization (Optional/Environment Dependent)
-- CREATE DATABASE datasphere;
-- \c datasphere;

-- 2. Schema Cleanup (Optional: Uncomment if you want to reset the database)
-- DROP TABLE IF EXISTS SQL_Practice_Sessions CASCADE;
-- DROP TABLE IF EXISTS Reviews CASCADE;
-- DROP TABLE IF EXISTS User_Quiz_Attempts CASCADE;
-- DROP TABLE IF EXISTS User_Progress CASCADE;
-- DROP TABLE IF EXISTS Quiz_Questions CASCADE;
-- DROP TABLE IF EXISTS Lesson_Content CASCADE;
-- DROP TABLE IF EXISTS Lessons CASCADE;
-- DROP TABLE IF EXISTS Modules CASCADE;
-- DROP TABLE IF EXISTS Track_Details CASCADE;
-- DROP TABLE IF EXISTS Tracks CASCADE;
-- DROP TABLE IF EXISTS User_Links CASCADE;
-- DROP TABLE IF EXISTS User_Education CASCADE;
-- DROP TABLE IF EXISTS User_Experience CASCADE;
-- DROP TABLE IF EXISTS Users CASCADE;

-- 3. Core Tables Implementation

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    school VARCHAR(255),
    city VARCHAR(100),
    age INT,
    source VARCHAR(50),
    avatar TEXT,
    bio TEXT,
    headline VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger Function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply Trigger to Users
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
        CREATE TRIGGER update_users_updated_at
            BEFORE UPDATE ON Users
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- User Profile Related Tables
CREATE TABLE IF NOT EXISTS User_Experience (
    experience_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    year VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Education (
    education_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    school VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    year VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Links (
    link_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Content Related Tables
CREATE TABLE IF NOT EXISTS Tracks (
    track_id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    long_description TEXT,
    overview TEXT,
    color_gradient VARCHAR(100),
    icon_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Track_Details (
    detail_id SERIAL PRIMARY KEY,
    track_id VARCHAR(50) UNIQUE NOT NULL REFERENCES Tracks(track_id) ON DELETE CASCADE,
    skills JSONB,
    target_audience JSONB,
    prerequisites JSONB,
    outcomes JSONB
);

CREATE TABLE IF NOT EXISTS Modules (
    module_id VARCHAR(50) PRIMARY KEY,
    track_id VARCHAR(50) NOT NULL REFERENCES Tracks(track_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Lessons (
    lesson_id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL REFERENCES Modules(module_id) ON DELETE CASCADE,
    slug VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(20),
    order_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Lesson_Content (
    content_id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(50) UNIQUE NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    paragraphs JSONB NOT NULL,
    example_title VARCHAR(255),
    example_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Quiz_Questions (
    question_id VARCHAR(50) PRIMARY KEY,
    lesson_id VARCHAR(50) NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INT NOT NULL,
    explanation TEXT,
    order_index INT NOT NULL
);

-- User Interaction & Progress Tables
CREATE TABLE IF NOT EXISTS User_Progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS User_Quiz_Attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    question_id VARCHAR(50) NOT NULL REFERENCES Quiz_Questions(question_id) ON DELETE CASCADE,
    selected_answer_index INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE SET NULL,
    author VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    date DATE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS SQL_Practice_Sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    execution_result JSONB,
    success BOOLEAN NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Performance Optimization (Indexes)
CREATE INDEX IF NOT EXISTS idx_users_email ON Users(email);
CREATE INDEX IF NOT EXISTS idx_user_experience_user_id ON User_Experience(user_id);
CREATE INDEX IF NOT EXISTS idx_user_education_user_id ON User_Education(user_id);
CREATE INDEX IF NOT EXISTS idx_user_links_user_id ON User_Links(user_id);
CREATE INDEX IF NOT EXISTS idx_tracks_slug ON Tracks(slug);
CREATE INDEX IF NOT EXISTS idx_modules_track_id ON Modules(track_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON Modules(order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON Lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON Lessons(order_index);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_lesson_id ON Quiz_Questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON User_Progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON User_Progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user_id ON User_Quiz_Attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_question_id ON User_Quiz_Attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON Reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON Reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_sql_practice_user_id ON SQL_Practice_Sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sql_practice_executed_at ON SQL_Practice_Sessions(executed_at);
