
CREATE TABLE IF NOT EXISTS merchants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE parking_spaces (
    id SERIAL PRIMARY KEY,
    lat VARCHAR(255),
    long VARCHAR(255),
    total_slots INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    user_id INT,  -- Foreign key to your users table
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT,  -- Foreign key to your users table
    parking_space_id INT,  -- Foreign key to the parking_spaces table
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    user_vehicle_id INT, -- Foreign key to vehicles table
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parking_space_id) REFERENCES parking_spaces(id),
    FOREIGN KEY (user_vehicle_id) REFERENCES vehicles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);