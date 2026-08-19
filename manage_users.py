#!/usr/bin/env python3
"""
ADMIN USER MANAGEMENT CLI TOOL
Usage: python manage_users.py
"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "database.db")

def main():
    if not os.path.exists(DB_PATH):
        print("Cơ sở dữ liệu database.db chưa được tạo. Hãy chạy server.py trước!")
        return

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    print("======================================================================")
    print("       QUẢN LÝ DỮ LIỆU TÀI KHOẢN HỌC VIÊN (DATABASE.DB)")
    print("======================================================================")
    
    users = cursor.execute("SELECT id, username, email, full_name, role, streak, xp, created_at FROM users").fetchall()
    
    print(f"\n[+] Tổng số tài khoản: {len(users)}\n")
    print(f"{'ID':<4} | {'Username':<15} | {'Email':<25} | {'Họ tên':<20} | {'Vai trò':<8} | {'Streak':<6} | {'XP':<6}")
    print("-" * 95)
    
    for u in users:
        print(f"{u['id']:<4} | {u['username']:<15} | {u['email']:<25} | {(u['full_name'] or ''):<20} | {u['role']:<8} | {u['streak']:<6} | {u['xp']:<6}")

    print("\n----------------------------------------------------------------------")
    conn.close()

if __name__ == '__main__':
    main()
