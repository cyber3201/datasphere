# DataSphere - Database Schema Documentation

This document outlines all the database tables and attributes needed for the DataSphere learning platform.

---

## Table of Contents
1. [Users Table](#1-users-table)
2. [User_Experience Table](#2-user_experience-table)
3. [User_Education Table](#3-user_education-table)
4. [User_Links Table](#4-user_links-table)
5. [Tracks Table](#5-tracks-table)
6. [Track_Details Table](#6-track_details-table)
7. [Modules Table](#7-modules-table)
8. [Lessons Table](#8-lessons-table)
9. [Lesson_Content Table](#9-lesson_content-table)
10. [Quiz_Questions Table](#10-quiz_questions-table)
11. [User_Progress Table](#11-user_progress-table)
12. [User_Quiz_Attempts Table](#12-user_quiz_attempts-table)
13. [Reviews Table](#13-reviews-table)
14. [SQL_Practice_Sessions Table](#14-sql_practice_sessions-table)
15. [Database Relationships](#database-relationships)
16. [SQL Schema Creation Scripts](#sql-schema-creation-scripts)

---

## 1. Users Table
**Purpose:** Stores user account information and profile data.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `user_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| `name` | VARCHAR(255) | NOT NULL | Full name of the user |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User's email address (login) |
| `password` | VARCHAR(255) | NOT NULL | Hashed password |
| `school` | VARCHAR(255) | NULL | Educational institution |
| `city` | VARCHAR(100) | NULL | City of residence |
| `age` | INT | NULL | User's age |
| `source` | VARCHAR(50) | NULL | How they heard about platform (social, friend, school, google, other) |
| `avatar` | TEXT | NULL | URL to avatar image |
| `bio` | TEXT | NULL | User biography |
| `headline` | VARCHAR(255) | NULL | Professional title (e.g., "Data Science Student") |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `user_id`
- UNIQUE INDEX on `email`

---

## 2. User_Experience Table
**Purpose:** Stores professional experience entries for user profiles.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `experience_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique experience entry identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE CASCADE | Reference to user |
| `role` | VARCHAR(255) | NOT NULL | Job title/role |
| `company` | VARCHAR(255) | NULL | Company name |
| `year` | VARCHAR(50) | NULL | Time period (e.g., "2022 - Present") |
| `description` | TEXT | NULL | Job description and responsibilities |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Entry creation timestamp |

**Indexes:**
- PRIMARY KEY on `experience_id`
- INDEX on `user_id`

---

## 3. User_Education Table
**Purpose:** Stores educational background for user profiles.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `education_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique education entry identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE CASCADE | Reference to user |
| `school` | VARCHAR(255) | NOT NULL | Educational institution name |
| `degree` | VARCHAR(255) | NULL | Degree or diploma obtained |
| `year` | VARCHAR(50) | NULL | Graduation year or period |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Entry creation timestamp |

**Indexes:**
- PRIMARY KEY on `education_id`
- INDEX on `user_id`

---

## 4. User_Links Table
**Purpose:** Stores social/professional links for user profiles.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `link_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique link identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE CASCADE | Reference to user |
| `label` | VARCHAR(100) | NOT NULL | Link label (e.g., "LinkedIn", "GitHub") |
| `url` | TEXT | NOT NULL | Full URL |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Entry creation timestamp |

**Indexes:**
- PRIMARY KEY on `link_id`
- INDEX on `user_id`

---

## 5. Tracks Table
**Purpose:** Stores learning track/course information.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `track_id` | VARCHAR(50) | PRIMARY KEY | Unique track identifier (e.g., "sql-mastery") |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly slug |
| `title` | VARCHAR(255) | NOT NULL | Track display title |
| `description` | TEXT | NULL | Short description |
| `long_description` | TEXT | NULL | Detailed description |
| `overview` | TEXT | NULL | Track overview |
| `color_gradient` | VARCHAR(100) | NULL | CSS gradient class (e.g., "from-blue-600 to-blue-800") |
| `icon_path` | TEXT | NULL | SVG path data for icon |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Track creation timestamp |

**Indexes:**
- PRIMARY KEY on `track_id`
- UNIQUE INDEX on `slug`

---

## 6. Track_Details Table
**Purpose:** Extended information for tracks (skills, audience, prerequisites, outcomes).

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `detail_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique detail identifier |
| `track_id` | VARCHAR(50) | FOREIGN KEY → Tracks.track_id, ON DELETE CASCADE | Reference to track |
| `skills` | JSON | NULL | Array of skills learned |
| `target_audience` | JSON | NULL | Array of target audience descriptions |
| `prerequisites` | JSON | NULL | Array of prerequisites |
| `outcomes` | JSON | NULL | Array of learning outcomes |

**Indexes:**
- PRIMARY KEY on `detail_id`
- UNIQUE INDEX on `track_id`

---

## 7. Modules Table
**Purpose:** Stores course modules within tracks.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `module_id` | VARCHAR(50) | PRIMARY KEY | Unique module identifier |
| `track_id` | VARCHAR(50) | FOREIGN KEY → Tracks.track_id, ON DELETE CASCADE | Reference to parent track |
| `title` | VARCHAR(255) | NOT NULL | Module title |
| `description` | TEXT | NULL | Module description |
| `order_index` | INT | NOT NULL | Display order within track (0-based) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Module creation timestamp |

**Indexes:**
- PRIMARY KEY on `module_id`
- INDEX on `track_id`
- INDEX on `order_index`

---

## 8. Lessons Table
**Purpose:** Stores individual lessons within modules.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `lesson_id` | VARCHAR(50) | PRIMARY KEY | Unique lesson identifier |
| `module_id` | VARCHAR(50) | FOREIGN KEY → Modules.module_id, ON DELETE CASCADE | Reference to parent module |
| `slug` | VARCHAR(100) | NULL | URL-friendly slug |
| `title` | VARCHAR(255) | NOT NULL | Lesson title |
| `duration` | VARCHAR(20) | NULL | Estimated duration (e.g., "15 min") |
| `order_index` | INT | NOT NULL | Display order within module (0-based) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Lesson creation timestamp |

**Indexes:**
- PRIMARY KEY on `lesson_id`
- INDEX on `module_id`
- INDEX on `order_index`

---

## 9. Lesson_Content Table
**Purpose:** Stores the actual content of lessons.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `content_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique content identifier |
| `lesson_id` | VARCHAR(50) | FOREIGN KEY → Lessons.lesson_id, ON DELETE CASCADE, UNIQUE | Reference to lesson (one-to-one) |
| `paragraphs` | JSON | NOT NULL | Array of 4 text paragraphs |
| `example_title` | VARCHAR(255) | NULL | Title for example section |
| `example_content` | TEXT | NULL | Example content/code |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Content creation timestamp |

**Indexes:**
- PRIMARY KEY on `content_id`
- UNIQUE INDEX on `lesson_id`

---

## 10. Quiz_Questions Table
**Purpose:** Stores quiz questions for lessons.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `question_id` | VARCHAR(50) | PRIMARY KEY | Unique question identifier |
| `lesson_id` | VARCHAR(50) | FOREIGN KEY → Lessons.lesson_id, ON DELETE CASCADE | Reference to lesson |
| `question` | TEXT | NOT NULL | Question text |
| `options` | JSON | NOT NULL | Array of answer options (typically 4 options) |
| `correct_index` | INT | NOT NULL | Index of correct answer (0-based) |
| `explanation` | TEXT | NULL | Explanation of correct answer |
| `order_index` | INT | NOT NULL | Question order (typically 3 questions per lesson) |

**Indexes:**
- PRIMARY KEY on `question_id`
- INDEX on `lesson_id`

---

## 11. User_Progress Table
**Purpose:** Tracks which lessons users have completed.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `progress_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique progress entry identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE CASCADE | Reference to user |
| `lesson_id` | VARCHAR(50) | FOREIGN KEY → Lessons.lesson_id, ON DELETE CASCADE | Reference to lesson |
| `completed` | BOOLEAN | DEFAULT FALSE | Completion status |
| `completed_at` | TIMESTAMP | NULL | Completion timestamp |
| UNIQUE(`user_id`, `lesson_id`) | | | Prevent duplicate entries |

**Indexes:**
- PRIMARY KEY on `progress_id`
- UNIQUE INDEX on (`user_id`, `lesson_id`)
- INDEX on `user_id`
- INDEX on `lesson_id`

---

## 12. User_Quiz_Attempts Table
**Purpose:** Stores user quiz attempt history.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `attempt_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique attempt identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE CASCADE | Reference to user |
| `question_id` | VARCHAR(50) | FOREIGN KEY → Quiz_Questions.question_id, ON DELETE CASCADE | Reference to question |
| `selected_answer_index` | INT | NOT NULL | Index of selected answer (0-based) |
| `is_correct` | BOOLEAN | NOT NULL | Whether answer was correct |
| `attempted_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Attempt timestamp |

**Indexes:**
- PRIMARY KEY on `attempt_id`
- INDEX on `user_id`
- INDEX on `question_id`

---

## 13. Reviews Table
**Purpose:** Stores user reviews/testimonials (optional feature).

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `review_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique review identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE SET NULL, NULL | Reference to user (nullable for anonymous) |
| `author` | VARCHAR(255) | NOT NULL | Author name |
| `city` | VARCHAR(100) | NULL | Author's city |
| `rating` | INT | NOT NULL, CHECK (rating BETWEEN 1 AND 5) | Rating (1-5 stars) |
| `comment` | TEXT | NOT NULL | Review comment |
| `date` | DATE | NOT NULL | Review date |
| `is_featured` | BOOLEAN | DEFAULT FALSE | Whether to feature on homepage |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Entry creation timestamp |

**Indexes:**
- PRIMARY KEY on `review_id`
- INDEX on `user_id`
- INDEX on `is_featured`

---

## 14. SQL_Practice_Sessions Table
**Purpose:** Stores SQL practice query history (optional feature).

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `session_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique session identifier |
| `user_id` | INT | FOREIGN KEY → Users.user_id, ON DELETE SET NULL, NULL | Reference to user (nullable for anonymous) |
| `query` | TEXT | NOT NULL | SQL query executed |
| `execution_result` | JSON | NULL | Query results or error message |
| `success` | BOOLEAN | NOT NULL | Whether query executed successfully |
| `executed_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Execution timestamp |

**Indexes:**
- PRIMARY KEY on `session_id`
- INDEX on `user_id`
- INDEX on `executed_at`

---

## Database Relationships

### Entity Relationship Diagram (Text Format)

```
Users (1) ──────→ (N) User_Experience
Users (1) ──────→ (N) User_Education
Users (1) ──────→ (N) User_Links
Users (1) ──────→ (N) User_Progress
Users (1) ──────→ (N) User_Quiz_Attempts
Users (1) ──────→ (N) Reviews
Users (1) ──────→ (N) SQL_Practice_Sessions

Tracks (1) ──────→ (1) Track_Details
Tracks (1) ──────→ (N) Modules

Modules (1) ─────→ (N) Lessons

Lessons (1) ─────→ (1) Lesson_Content
Lessons (1) ─────→ (N) Quiz_Questions
Lessons (1) ─────→ (N) User_Progress

Quiz_Questions (1) → (N) User_Quiz_Attempts
```

### Relationship Summary

| Parent Table | Child Table | Relationship Type | Foreign Key |
|-------------|-------------|-------------------|-------------|
| Users | User_Experience | One-to-Many | user_id |
| Users | User_Education | One-to-Many | user_id |
| Users | User_Links | One-to-Many | user_id |
| Users | User_Progress | One-to-Many | user_id |
| Users | User_Quiz_Attempts | One-to-Many | user_id |
| Users | Reviews | One-to-Many | user_id |
| Users | SQL_Practice_Sessions | One-to-Many | user_id |
| Tracks | Track_Details | One-to-One | track_id |
| Tracks | Modules | One-to-Many | track_id |
| Modules | Lessons | One-to-Many | module_id |
| Lessons | Lesson_Content | One-to-One | lesson_id |
| Lessons | Quiz_Questions | One-to-Many | lesson_id |
| Lessons | User_Progress | One-to-Many | lesson_id |
| Quiz_Questions | User_Quiz_Attempts | One-to-Many | question_id |

---

## SQL Schema Creation Scripts

### MySQL/MariaDB Schema

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS datasphere CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE datasphere;

-- 1. Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. User_Experience Table
CREATE TABLE User_Experience (
    experience_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    year VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. User_Education Table
CREATE TABLE User_Education (
    education_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    school VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    year VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. User_Links Table
CREATE TABLE User_Links (
    link_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    label VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Track_Details Table
CREATE TABLE Track_Details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    track_id VARCHAR(50) UNIQUE NOT NULL,
    skills JSON,
    target_audience JSON,
    prerequisites JSON,
    outcomes JSON,
    FOREIGN KEY (track_id) REFERENCES Tracks(track_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Modules Table
CREATE TABLE Modules (
    module_id VARCHAR(50) PRIMARY KEY,
    track_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (track_id) REFERENCES Tracks(track_id) ON DELETE CASCADE,
    INDEX idx_track_id (track_id),
    INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Lessons Table
CREATE TABLE Lessons (
    lesson_id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL,
    slug VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(20),
    order_index INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES Modules(module_id) ON DELETE CASCADE,
    INDEX idx_module_id (module_id),
    INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Lesson_Content Table
CREATE TABLE Lesson_Content (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id VARCHAR(50) UNIQUE NOT NULL,
    paragraphs JSON NOT NULL,
    example_title VARCHAR(255),
    example_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Quiz_Questions Table
CREATE TABLE Quiz_Questions (
    question_id VARCHAR(50) PRIMARY KEY,
    lesson_id VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    options JSON NOT NULL,
    correct_index INT NOT NULL,
    explanation TEXT,
    order_index INT NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    INDEX idx_lesson_id (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. User_Progress Table
CREATE TABLE User_Progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_lesson (user_id, lesson_id),
    INDEX idx_user_id (user_id),
    INDEX idx_lesson_id (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. User_Quiz_Attempts Table
CREATE TABLE User_Quiz_Attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id VARCHAR(50) NOT NULL,
    selected_answer_index INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Quiz_Questions(question_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_question_id (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Reviews Table
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    author VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    date DATE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. SQL_Practice_Sessions Table
CREATE TABLE SQL_Practice_Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    query TEXT NOT NULL,
    execution_result JSON,
    success BOOLEAN NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_executed_at (executed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### PostgreSQL Schema

```sql
-- Create Database
CREATE DATABASE datasphere ENCODING 'UTF8';
\c datasphere;

-- 1. Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    school VARCHAR(255),
    city VARCHAR(100),
    age INTEGER,
    source VARCHAR(50),
    avatar TEXT,
    bio TEXT,
    headline VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON Users(email);

-- 2. User_Experience Table
CREATE TABLE User_Experience (
    experience_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    year VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_experience_user_id ON User_Experience(user_id);

-- 3. User_Education Table
CREATE TABLE User_Education (
    education_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    school VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    year VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_education_user_id ON User_Education(user_id);

-- 4. User_Links Table
CREATE TABLE User_Links (
    link_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_links_user_id ON User_Links(user_id);

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tracks_slug ON Tracks(slug);

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
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_modules_track_id ON Modules(track_id);
CREATE INDEX idx_modules_order ON Modules(order_index);

-- 8. Lessons Table
CREATE TABLE Lessons (
    lesson_id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL REFERENCES Modules(module_id) ON DELETE CASCADE,
    slug VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(20),
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_module_id ON Lessons(module_id);
CREATE INDEX idx_lessons_order ON Lessons(order_index);

-- 9. Lesson_Content Table
CREATE TABLE Lesson_Content (
    content_id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(50) UNIQUE NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    paragraphs JSONB NOT NULL,
    example_title VARCHAR(255),
    example_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Quiz_Questions Table
CREATE TABLE Quiz_Questions (
    question_id VARCHAR(50) PRIMARY KEY,
    lesson_id VARCHAR(50) NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT,
    order_index INTEGER NOT NULL
);

CREATE INDEX idx_quiz_questions_lesson_id ON Quiz_Questions(lesson_id);

-- 11. User_Progress Table
CREATE TABLE User_Progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL REFERENCES Lessons(lesson_id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_progress_user_id ON User_Progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON User_Progress(lesson_id);

-- 12. User_Quiz_Attempts Table
CREATE TABLE User_Quiz_Attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    question_id VARCHAR(50) NOT NULL REFERENCES Quiz_Questions(question_id) ON DELETE CASCADE,
    selected_answer_index INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_quiz_attempts_user_id ON User_Quiz_Attempts(user_id);
CREATE INDEX idx_user_quiz_attempts_question_id ON User_Quiz_Attempts(question_id);

-- 13. Reviews Table
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NULL REFERENCES Users(user_id) ON DELETE SET NULL,
    author VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    date DATE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_user_id ON Reviews(user_id);
CREATE INDEX idx_reviews_featured ON Reviews(is_featured);

-- 14. SQL_Practice_Sessions Table
CREATE TABLE SQL_Practice_Sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER NULL REFERENCES Users(user_id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    execution_result JSONB,
    success BOOLEAN NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sql_practice_sessions_user_id ON SQL_Practice_Sessions(user_id);
CREATE INDEX idx_sql_practice_sessions_executed_at ON SQL_Practice_Sessions(executed_at);
```

---

## Sample Data Queries

### Insert Sample User
```sql
INSERT INTO Users (name, email, password, school, city, age, source, headline)
VALUES ('Karim Bennani', 'karim@example.com', '$2b$10$hashedpassword', 'ESTEM', 'Casablanca', 22, 'google', 'Étudiant Data Science');
```

### Insert Sample Track
```sql
INSERT INTO Tracks (track_id, slug, title, description, color_gradient)
VALUES ('sql-mastery', 'sql-mastery', 'Maîtrise SQL', 'Le langage universel de la data', 'from-blue-600 to-blue-800');
```

### Track User Progress
```sql
INSERT INTO User_Progress (user_id, lesson_id, completed, completed_at)
VALUES (1, 'sql-intro-1', TRUE, CURRENT_TIMESTAMP);
```

### Get User's Completed Lessons
```sql
SELECT l.title, l.duration, up.completed_at
FROM User_Progress up
JOIN Lessons l ON up.lesson_id = l.lesson_id
WHERE up.user_id = 1 AND up.completed = TRUE
ORDER BY up.completed_at DESC;
```

### Calculate Track Progress Percentage
```sql
SELECT 
    t.title AS track_title,
    COUNT(DISTINCT l.lesson_id) AS total_lessons,
    COUNT(DISTINCT up.lesson_id) AS completed_lessons,
    ROUND((COUNT(DISTINCT up.lesson_id) * 100.0 / COUNT(DISTINCT l.lesson_id)), 2) AS progress_percentage
FROM Tracks t
JOIN Modules m ON t.track_id = m.track_id
JOIN Lessons l ON m.module_id = l.module_id
LEFT JOIN User_Progress up ON l.lesson_id = up.lesson_id AND up.user_id = 1 AND up.completed = TRUE
WHERE t.track_id = 'sql-mastery'
GROUP BY t.track_id, t.title;
```

---

## Notes and Recommendations

### Performance Optimization
1. **Indexing**: All foreign keys are indexed for faster joins
2. **JSON Fields**: Use for flexible array/object storage (skills, quiz options, etc.)
3. **Caching**: Consider caching frequently accessed data (tracks, modules, lessons)
4. **Pagination**: Implement pagination for large result sets (user progress, quiz attempts)

### Security Considerations
1. **Password Hashing**: Always use bcrypt or similar for password storage
2. **SQL Injection**: Use parameterized queries/prepared statements
3. **Input Validation**: Validate all user inputs before database insertion
4. **Access Control**: Implement role-based access control (RBAC) if needed

### Data Integrity
1. **Foreign Key Constraints**: Maintain referential integrity
2. **Cascading Deletes**: Properly configured to clean up related data
3. **Unique Constraints**: Prevent duplicate entries (user_id + lesson_id in progress)
4. **Check Constraints**: Validate data ranges (rating 1-5)

### Migration Strategy
1. Start with core tables: Users, Tracks, Modules, Lessons
2. Add content tables: Lesson_Content, Quiz_Questions
3. Add tracking tables: User_Progress, User_Quiz_Attempts
4. Add profile tables: User_Experience, User_Education, User_Links
5. Add optional tables: Reviews, SQL_Practice_Sessions

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-21  
**Author:** Database Schema for DataSphere Learning Platform
