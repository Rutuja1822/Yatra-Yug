CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT DEFAULT '',
    location TEXT DEFAULT '',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    destination_id INTEGER NOT NULL,
    destination_name TEXT NOT NULL,
    state TEXT NOT NULL,
    emoji TEXT DEFAULT '',
    color TEXT DEFAULT '',
    season TEXT DEFAULT '',
    km INTEGER NOT NULL,
    travel_date TEXT NOT NULL,
    return_date TEXT NOT NULL,
    passengers INTEGER NOT NULL,
    bus_type TEXT NOT NULL,
    fuel_cost INTEGER NOT NULL DEFAULT 0,
    accom_cost INTEGER NOT NULL DEFAULT 0,
    food_cost INTEGER NOT NULL DEFAULT 0,
    sight_cost INTEGER NOT NULL DEFAULT 0,
    misc_cost INTEGER NOT NULL DEFAULT 0,
    total_cost INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL,
    booked_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER,
    user_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    transaction_account_name TEXT NOT NULL,
    email TEXT NOT NULL,
    contact TEXT NOT NULL,
    destination TEXT NOT NULL,
    passengers INTEGER NOT NULL,
    utr TEXT NOT NULL UNIQUE,
    payment_date TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
