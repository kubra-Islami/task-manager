CREATE TABLE Users
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255),
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    status      VARCHAR(20) DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done','on_hold')),
    priority    VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')),
    due_date    TIMESTAMP,
    user_id     INTEGER REFERENCES Users (id) ON DELETE CASCADE,
    created_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subtasks
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    task_id    INTEGER      NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
