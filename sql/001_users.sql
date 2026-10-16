
CREATE TABLE IF NOT EXISTS users(
    id UUID  PRIMARY KEY  DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passowrd_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'USER' CHECK(role IN ('USER','ADMIN')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

ALTER TABLE users RENAME COLUMN paasowrd_hash TO password_hash;