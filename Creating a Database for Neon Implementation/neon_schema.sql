-- DataSphere Database Schema for Neon PostgreSQL
-- Generated based on tabs.md requirements

-- Enable necessary extensions if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE Users (
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

-- Trigger to update updated_at for Users
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON Users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 2. User_Experience Table
CREATE TABLE User_Experience (
    experience_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    year VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. User_Education Table
CREATE TABLE User_Education (
    education_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    school VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    year VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. User_Links Table
CREATE TABLE User_Links (
    link_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tracks Table
CREATE TABLE Tracks (
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

-- 6. Track_Details Table
CREATE TABLE Track_Details (
    detail_id SERIAL PRIMARY KEY,
    track_id VARCHAR(50) UNIQUE NOT NULL REFERENCES Tracks(track_id) ON DELETE CASCADE,
    skills JSONB,
    target_audience JSONB,
    prerequisites JSONB,
    outcomes JSONB
);

-- 7. Modules Table
CREATE TABLE Modules (
    module_id VARCHAR(50) PRIMARY KEY,
    track_id VARCHAR(50) NOT NULL REFERENCES Tracks(track_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Lessons Table
CREATE TABLE Lessons (
    lesson_id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL REFERENCES Modules(module_id) ON DELETE CASCADE,
    slug VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(20),
    order_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Lesson_Content Table
CREATE TABLE Lesson_Content (
    content_id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(50) UNIQUE NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    paragraphs JSONB NOT NULL,
    example_title VARCHAR(255),
    example_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Quiz_Questions Table
CREATE TABLE Quiz_Questions (
    question_id VARCHAR(50) PRIMARY KEY,
    lesson_id VARCHAR(50) NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INT NOT NULL,
    explanation TEXT,
    order_index INT NOT NULL
);

-- 11. User_Progress Table
CREATE TABLE User_Progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, lesson_id)
);

-- 12. User_Quiz_Attempts Table
CREATE TABLE User_Quiz_Attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    question_id VARCHAR(50) NOT NULL REFERENCES Quiz_Questions(question_id) ON DELETE CASCADE,
    selected_answer_index INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Reviews Table
CREATE TABLE Reviews (
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

-- 14. SQL_Practice_Sessions Table
CREATE TABLE SQL_Practice_Sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    execution_result JSONB,
    success BOOLEAN NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_user_experience_user_id ON User_Experience(user_id);
CREATE INDEX idx_user_education_user_id ON User_Education(user_id);
CREATE INDEX idx_user_links_user_id ON User_Links(user_id);
CREATE INDEX idx_tracks_slug ON Tracks(slug);
CREATE INDEX idx_modules_track_id ON Modules(track_id);
CREATE INDEX idx_modules_order ON Modules(order_index);
CREATE INDEX idx_lessons_module_id ON Lessons(module_id);
CREATE INDEX idx_lessons_order ON Lessons(order_index);
CREATE INDEX idx_quiz_questions_lesson_id ON Quiz_Questions(lesson_id);
CREATE INDEX idx_user_progress_user_id ON User_Progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON User_Progress(lesson_id);
CREATE INDEX idx_user_quiz_attempts_user_id ON User_Quiz_Attempts(user_id);
CREATE INDEX idx_user_quiz_attempts_question_id ON User_Quiz_Attempts(question_id);
CREATE INDEX idx_reviews_user_id ON Reviews(user_id);
CREATE INDEX idx_reviews_featured ON Reviews(is_featured);
CREATE INDEX idx_sql_practice_user_id ON SQL_Practice_Sessions(user_id);
CREATE INDEX idx_sql_practice_executed_at ON SQL_Practice_Sessions(executed_at);
