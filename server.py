#!/usr/bin/env python3
"""
Yatra Yug local server with SQLite-backed users and bookings.
Run this file to launch the site on http://localhost:8080
"""
from __future__ import annotations

import json
import os
import sqlite3
import sys
import webbrowser
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


PORT = 8080
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "yatrayug.db"
SCHEMA_PATH = BASE_DIR / "schema.sql"
DUMP_PATH = BASE_DIR / "yatrayug_data.sql"


def db_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    schema_sql = SCHEMA_PATH.read_text(encoding="utf-8")
    with db_conn() as conn:
        conn.executescript(schema_sql)
    export_sql_dump()


def export_sql_dump() -> None:
    with db_conn() as conn:
        dump_sql = "\n".join(conn.iterdump()) + "\n"
    DUMP_PATH.write_text(dump_sql, encoding="utf-8")


def json_response(handler: "Handler", status: int, payload: dict) -> None:
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def read_json(handler: "Handler") -> dict:
    length = int(handler.headers.get("Content-Length", "0"))
    raw = handler.rfile.read(length) if length else b"{}"
    try:
        return json.loads(raw.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON payload.")


def booking_row_to_dict(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "destination_id": row["destination_id"],
        "destination_name": row["destination_name"],
        "state": row["state"],
        "emoji": row["emoji"],
        "color": row["color"],
        "season": row["season"],
        "km": row["km"],
        "travel_date": row["travel_date"],
        "return_date": row["return_date"],
        "passengers": row["passengers"],
        "bus_type": row["bus_type"],
        "fuel_cost": row["fuel_cost"],
        "accom_cost": row["accom_cost"],
        "food_cost": row["food_cost"],
        "sight_cost": row["sight_cost"],
        "misc_cost": row["misc_cost"],
        "total_cost": row["total_cost"],
        "status": row["status"],
        "booked_at": row["booked_at"],
        "created_at": row["created_at"],
    }


def payment_row_to_dict(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "booking_id": row["booking_id"],
        "user_id": row["user_id"],
        "user_name": row["user_name"],
        "transaction_account_name": row["transaction_account_name"],
        "email": row["email"],
        "contact": row["contact"],
        "destination": row["destination"],
        "passengers": row["passengers"],
        "utr": row["utr"],
        "payment_date": row["payment_date"],
        "created_at": row["created_at"],
    }


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        print(f"  {self.command} {self.path} -> {args[1]}")

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/api/register":
                self.handle_register()
                return
            if parsed.path == "/api/login":
                self.handle_login()
                return
            if parsed.path == "/api/bookings":
                self.handle_create_booking()
                return
            self.send_error(404, "Not Found")
        except ValueError as err:
            json_response(self, 400, {"error": str(err)})
        except sqlite3.Error:
            json_response(self, 500, {"error": "Database operation failed."})
        except Exception:
            json_response(self, 500, {"error": "Unexpected server error."})

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/api/bookings":
                self.handle_bookings_query(parse_qs(parsed.query))
                return
            if parsed.path.startswith("/api/bookings/"):
                self.handle_booking_detail(parsed.path, parse_qs(parsed.query))
                return
            if parsed.path == "/api/planned-trips":
                self.handle_planned_trips()
                return
            super().do_GET()
        except ValueError as err:
            json_response(self, 400, {"error": str(err)})
        except sqlite3.Error:
            json_response(self, 500, {"error": "Database operation failed."})
        except Exception:
            json_response(self, 500, {"error": "Unexpected server error."})

    def handle_register(self) -> None:
        payload = read_json(self)
        name = (payload.get("name") or "").strip()
        email = (payload.get("email") or "").strip().lower()
        phone = (payload.get("phone") or "").strip()
        location = (payload.get("location") or "").strip()
        password_hash = (payload.get("password_hash") or "").strip()

        if not name or not email or not password_hash:
            json_response(self, 400, {"error": "Missing required fields."})
            return

        try:
            with db_conn() as conn:
                cur = conn.execute(
                    """
                    INSERT INTO users (name, email, phone, location, password_hash)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (name, email, phone, location, password_hash),
                )
                user_id = cur.lastrowid
            export_sql_dump()
        except sqlite3.IntegrityError:
            json_response(self, 409, {"error": "Email already registered."})
            return

        json_response(
            self,
            201,
            {"user": {"id": user_id, "name": name, "email": email, "phone": phone, "location": location}},
        )

    def handle_login(self) -> None:
        payload = read_json(self)
        email = (payload.get("email") or "").strip().lower()
        password_hash = (payload.get("password_hash") or "").strip()
        if not email or not password_hash:
            json_response(self, 400, {"error": "Missing email or password."})
            return

        with db_conn() as conn:
            row = conn.execute(
                """
                SELECT id, name, email, phone, location
                FROM users
                WHERE email = ? AND password_hash = ?
                """,
                (email, password_hash),
            ).fetchone()

        if not row:
            json_response(self, 401, {"error": "Invalid email or password."})
            return

        json_response(self, 200, {"user": dict(row)})

    def handle_create_booking(self) -> None:
        payload = read_json(self)
        required = [
            "user_id",
            "destination_id",
            "destination_name",
            "state",
            "km",
            "travel_date",
            "return_date",
            "passengers",
            "bus_type",
            "status",
            "booked_at",
            "budget",
            "payment",
        ]
        if any(payload.get(key) in (None, "") for key in required):
            json_response(self, 400, {"error": "Missing booking fields."})
            return

        budget = payload["budget"] or {}
        payment = payload["payment"] or {}
        payment_required = ["transaction_account_name", "email", "contact", "utr", "payment_date"]
        if any(payment.get(key) in (None, "") for key in payment_required):
            json_response(self, 400, {"error": "Missing payment fields."})
            return
        try:
            user_id = int(payload["user_id"])
            destination_id = int(payload["destination_id"])
            km = int(payload["km"])
            passengers = int(payload["passengers"])
        except (TypeError, ValueError):
            raise ValueError("Booking fields have invalid types.")

        session_user = payload.get("session_user") or {}

        try:
            with db_conn() as conn:
                user_row = conn.execute(
                    "SELECT id, name, email, phone, location FROM users WHERE id = ?",
                    (user_id,),
                ).fetchone()
                if not user_row:
                    session_email = (session_user.get("email") or "").strip().lower()
                    if not session_email:
                        json_response(self, 404, {"error": "User not found."})
                        return

                    existing_user = conn.execute(
                        "SELECT id, name, email, phone, location FROM users WHERE email = ?",
                        (session_email,),
                    ).fetchone()
                    if existing_user:
                        user_id = existing_user["id"]
                        user_row = existing_user
                    else:
                        conn.execute(
                            """
                            INSERT INTO users (id, name, email, phone, location, password_hash)
                            VALUES (?, ?, ?, ?, ?, ?)
                            """,
                            (
                                user_id,
                                (session_user.get("name") or "Traveler").strip(),
                                session_email,
                                (session_user.get("phone") or "").strip(),
                                (session_user.get("location") or "").strip(),
                                "session-restored",
                            ),
                        )
                        user_row = conn.execute(
                            "SELECT id, name, email, phone, location FROM users WHERE id = ?",
                            (user_id,),
                        ).fetchone()

                cur = conn.execute(
                    """
                    INSERT INTO bookings (
                        user_id, destination_id, destination_name, state, emoji, color, season, km,
                        travel_date, return_date, passengers, bus_type,
                        fuel_cost, accom_cost, food_cost, sight_cost, misc_cost, total_cost,
                        status, booked_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        user_id,
                        destination_id,
                        payload["destination_name"],
                        payload["state"],
                        payload.get("emoji", ""),
                        payload.get("color", ""),
                        payload.get("season", ""),
                        km,
                        payload["travel_date"],
                        payload["return_date"],
                        passengers,
                        payload["bus_type"],
                        budget.get("fuel", 0),
                        budget.get("accom", 0),
                        budget.get("food", 0),
                        budget.get("sight", 0),
                        budget.get("misc", 0),
                        budget.get("total", 0),
                        payload["status"],
                        payload["booked_at"],
                    ),
                )
                booking_id = cur.lastrowid
                conn.execute(
                    """
                    INSERT INTO payments (
                        booking_id, user_id, user_name, transaction_account_name, email, contact,
                        destination, passengers, utr, payment_date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        booking_id,
                        user_id,
                        user_row["name"],
                        payment["transaction_account_name"],
                        payment["email"],
                        payment["contact"],
                        payload["destination_name"],
                        passengers,
                        payment["utr"].strip().upper(),
                        payment["payment_date"],
                    ),
                )
        except sqlite3.IntegrityError as err:
            if "payments.utr" in str(err).lower():
                json_response(self, 409, {"error": "This UTR number is already submitted."})
                return
            raise
        export_sql_dump()
        json_response(self, 201, {"booking_id": booking_id, "user_id": user_id})

    def handle_bookings_query(self, query: dict) -> None:
        user_id = query.get("user_id", [None])[0]
        if not user_id:
            json_response(self, 400, {"error": "user_id is required."})
            return
        try:
            user_id = int(user_id)
        except ValueError:
            raise ValueError("user_id must be a number.")

        with db_conn() as conn:
            rows = conn.execute(
                """
                SELECT *
                FROM bookings
                WHERE user_id = ?
                ORDER BY created_at DESC, id DESC
                """,
                (user_id,),
            ).fetchall()

        json_response(self, 200, {"bookings": [booking_row_to_dict(row) for row in rows]})

    def handle_booking_detail(self, path: str, query: dict) -> None:
        user_id = query.get("user_id", [None])[0]
        booking_id = path.rsplit("/", 1)[-1]
        if not user_id or not booking_id.isdigit():
            json_response(self, 400, {"error": "Invalid booking lookup."})
            return
        try:
            user_id = int(user_id)
        except ValueError:
            raise ValueError("user_id must be a number.")

        with db_conn() as conn:
            row = conn.execute(
                """
                SELECT *
                FROM bookings
                WHERE id = ? AND user_id = ?
                """,
                (int(booking_id), user_id),
            ).fetchone()

        if not row:
            json_response(self, 404, {"error": "Booking not found."})
            return

        json_response(self, 200, {"booking": booking_row_to_dict(row)})

    def handle_planned_trips(self) -> None:
        with db_conn() as conn:
            rows = conn.execute(
                """
                SELECT
                    b.id,
                    b.booked_at,
                    b.travel_date,
                    b.return_date,
                    b.passengers,
                    b.bus_type,
                    b.destination_name,
                    b.state,
                    b.total_cost,
                    b.status,
                    u.name AS traveler_name,
                    u.email AS traveler_email,
                    u.phone AS traveler_phone,
                    u.location AS traveler_location
                FROM bookings b
                JOIN users u ON u.id = b.user_id
                ORDER BY b.created_at DESC, b.id DESC
                """
            ).fetchall()

        json_response(self, 200, {"planned_trips": [dict(row) for row in rows]})


if __name__ == "__main__":
    os.chdir(BASE_DIR)
    init_db()
    print("=" * 50)
    print("  Yatra Yug")
    print("=" * 50)
    print(f"  Server running at: http://localhost:{PORT}")
    print(f"  Database file: {DB_PATH.name}")
    print(f"  SQL dump file: {DUMP_PATH.name}")
    print("=" * 50)
    try:
        webbrowser.open(f"http://localhost:{PORT}")
    except Exception:
        pass
    class ReusableHTTPServer(ThreadingHTTPServer):
        allow_reuse_address = True
    try:
        with ReusableHTTPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except OSError as err:
        print(f"\n  Failed to start server on port {PORT}: {err}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n  Server stopped at", datetime.now().isoformat(timespec="seconds"))
    except OSError as err:
        print(f"\n  Failed to start server on port {PORT}: {err}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n  Server stopped at", datetime.now().isoformat(timespec="seconds"))
