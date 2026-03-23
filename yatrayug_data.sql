BEGIN TRANSACTION;
CREATE TABLE bookings (
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
INSERT INTO "bookings" VALUES(1,1773945346647,4,'Munnar','Kerala','🍃','#1a4a1a','Sep–May',1600,'2026-03-25','2026-03-26',5,'Standard',20000,7500,4000,2500,1500,35500,'Confirmed','24/3/2026','2026-03-23 18:58:12');
INSERT INTO "bookings" VALUES(2,1773945346648,3,'Goa','Goa','🏖️','#006666','Nov–Feb',600,'2026-03-31','2027-05-20',1,'Standard',1500,1500,800,500,300,4600,'Confirmed','24/3/2026','2026-03-23 19:13:10');
CREATE TABLE payments (
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
INSERT INTO "payments" VALUES(1,1,1773945346647,'rahul','gfdfhjgvm','rahul12@gmail.com','4567876545678','Munnar',5,'JHBGV76545678','24/3/2026, 12:28:12 am','2026-03-23 18:58:12');
INSERT INTO "payments" VALUES(2,2,1773945346648,'Rohan','jsdghvhjsv','rohan12@gmail.com','786478236478632','Goa',1,'8736782364478236','24/3/2026, 12:43:10 am','2026-03-23 19:13:10');
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT DEFAULT '',
    location TEXT DEFAULT '',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "users" VALUES(1773945346647,'rahul','rahul12@gmail.com','','','session-restored','2026-03-23 18:58:12');
INSERT INTO "users" VALUES(1773945346648,'Rohan','rohan12@gmail.com','','','-130a47d9','2026-03-23 19:07:46');
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('users',1773945346648);
INSERT INTO "sqlite_sequence" VALUES('bookings',2);
INSERT INTO "sqlite_sequence" VALUES('payments',2);
COMMIT;
