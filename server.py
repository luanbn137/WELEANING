#!/usr/bin/env python3
"""
VOCAB & ROLEPLAY LEARNING SYSTEM - FULLSTACK BACKEND SERVER
Technologies: Python 3.11, Built-in HTTP REST API Server, SQLite3 Relational Database
Features: User Authentication (SHA-256), Session Token Management, Progress Tracking,
          Vocab Vault CRUD with SRS Scheduling, Roleplay Evaluation Logging, Admin Analytics.
"""

import os
import sys
import json
import sqlite3
import hashlib
import secrets
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Database File Path & Dynamic Port for Render.com Cloud
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "database.db")
PORT = int(os.environ.get('PORT', 8080))

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    """Initializes SQLite Database schema for Capstone Project"""
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        role TEXT DEFAULT 'student',
        streak INTEGER DEFAULT 5,
        xp INTEGER DEFAULT 120,
        gems INTEGER DEFAULT 50,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 2. Sessions Table (Auth Tokens)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # 3. User Progress Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        lang TEXT NOT NULL,
        week_num INTEGER NOT NULL,
        reading_percent INTEGER DEFAULT 0,
        listening_percent INTEGER DEFAULT 0,
        writing_percent INTEGER DEFAULT 0,
        roleplay_percent INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, lang, week_num),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # 4. Vocab Vault Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS vocab_vault (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        lang TEXT NOT NULL,
        word TEXT NOT NULL,
        phonetic TEXT,
        translation_vi TEXT NOT NULL,
        explanation_en TEXT,
        example_sentence TEXT,
        example_translation TEXT,
        week_num INTEGER DEFAULT 1,
        topic TEXT,
        tag TEXT DEFAULT 'General',
        mastery_level INTEGER DEFAULT 1,
        next_review_date TIMESTAMP,
        last_reviewed_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # 5. Roleplay History Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS roleplay_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        lang TEXT NOT NULL,
        week_num INTEGER NOT NULL,
        user_response TEXT,
        standard_answer TEXT,
        native_answer TEXT,
        ai_feedback_json TEXT,
        score INTEGER DEFAULT 85,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # Seed Default Demo User if empty
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        salt = "vocab_app_salt_"
        pwd_hash = hashlib.sha256((salt + "123456").encode('utf-8')).hexdigest()
        cursor.execute("""
        INSERT INTO users (username, email, password_hash, full_name, role, streak, xp, gems)
        VALUES ('hocvien1', 'hocvien@gmail.com', ?, 'Học Viên Demo', 'student', 5, 250, 80)
        """, (pwd_hash,))
        
        admin_hash = hashlib.sha256((salt + "admin123").encode('utf-8')).hexdigest()
        cursor.execute("""
        INSERT INTO users (username, email, password_hash, full_name, role, streak, xp, gems)
        VALUES ('admin', 'admin@vocabapp.edu.vn', ?, 'Giảng Viên Quản Trị', 'admin', 14, 1500, 500)
        """, (admin_hash,))

    conn.commit()
    conn.close()
    print("Database initialized successfully at database.db!")

# Password hashing helper
def hash_password(password):
    salt = "vocab_app_salt_"
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()

# Helper to verify token
def get_user_from_token(token):
    if not token:
        return None
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT u.id, u.username, u.email, u.full_name, u.role, u.streak, u.xp, u.gems 
    FROM sessions s 
    JOIN users u ON s.user_id = u.id 
    WHERE s.token = ?
    """, (token,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

class CapstoneRequestHandler(BaseHTTPRequestHandler):
    
    def _send_json(self, data, code=200):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def _send_static(self, filepath):
        if not os.path.exists(filepath) or os.path.isdir(filepath):
            self.send_error(404, "File Not Found")
            return
        
        mime_type, _ = mimetypes.guess_type(filepath)
        if mime_type is None:
            mime_type = 'application/octet-stream'

        self.send_response(200)
        self.send_header('Content-Type', mime_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        with open(filepath, 'rb') as f:
            self.wfile.write(f.read())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()

    def get_auth_token(self):
        auth_header = self.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.split(' ')[1]
        
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)
        if 'token' in qs:
            return qs['token'][0]
        return None

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # REST API Routes
        if path.startswith('/api/'):
            token = self.get_auth_token()
            user = get_user_from_token(token)

            if path == '/api/auth/me':
                if not user:
                    return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)
                return self._send_json({'status': 'success', 'user': user})

            elif path == '/api/progress':
                if not user:
                    return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)
                conn = get_db_connection()
                rows = conn.execute("SELECT * FROM user_progress WHERE user_id = ?", (user['id'],)).fetchall()
                conn.close()
                return self._send_json({'status': 'success', 'progress': [dict(r) for r in rows]})

            elif path == '/api/vocab':
                if not user:
                    return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)
                conn = get_db_connection()
                rows = conn.execute("SELECT * FROM vocab_vault WHERE user_id = ? ORDER BY created_at DESC", (user['id'],)).fetchall()
                conn.close()
                return self._send_json({'status': 'success', 'vocab': [dict(r) for r in rows]})

            elif path == '/api/admin/stats':
                conn = get_db_connection()
                total_users = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
                total_vocab = conn.execute("SELECT COUNT(*) FROM vocab_vault").fetchone()[0]
                total_rp = conn.execute("SELECT COUNT(*) FROM roleplay_history").fetchone()[0]
                top_users = conn.execute("SELECT username, full_name, streak, xp FROM users ORDER BY xp DESC LIMIT 5").fetchall()
                conn.close()
                return self._send_json({
                    'status': 'success',
                    'stats': {
                        'total_users': total_users,
                        'total_vocab': total_vocab,
                        'total_roleplays': total_rp,
                        'top_leaderboard': [dict(r) for r in top_users]
                    }
                })

            else:
                return self._send_json({'status': 'error', 'message': 'API endpoint not found'}, 404)

        # Static File Serving
        root_dir = os.path.dirname(os.path.abspath(__file__))
        if path == '/':
            filepath = os.path.join(root_dir, 'index.html')
        else:
            filepath = os.path.join(root_dir, path.lstrip('/'))
        
        self._send_static(filepath)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        try:
            payload = json.loads(post_data) if post_data else {}
        except Exception:
            payload = {}

        token = self.get_auth_token()
        user = get_user_from_token(token)

        # 1. Register API
        if path == '/api/auth/register':
            username = payload.get('username', '').strip()
            email = payload.get('email', '').strip()
            password = payload.get('password', '').strip()
            full_name = payload.get('full_name', username).strip()

            if not username or not email or not password:
                return self._send_json({'status': 'error', 'message': 'Vui lòng điền đầy đủ Tên người dùng, Email và Mật khẩu!'}, 400)

            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Check existing
            existing = cursor.execute("SELECT id FROM users WHERE username = ? OR email = ?", (username, email)).fetchone()
            if existing:
                conn.close()
                return self._send_json({'status': 'error', 'message': 'Tên người dùng hoặc Email đã được đăng ký!'}, 400)

            pwd_hash = hash_password(password)
            cursor.execute("""
            INSERT INTO users (username, email, password_hash, full_name, streak, xp, gems)
            VALUES (?, ?, ?, ?, 1, 50, 20)
            """, (username, email, pwd_hash, full_name))
            user_id = cursor.lastrowid

            # Generate Token
            new_token = secrets.token_hex(24)
            cursor.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (new_token, user_id))
            
            conn.commit()
            
            new_user = dict(cursor.execute("SELECT id, username, email, full_name, role, streak, xp, gems FROM users WHERE id = ?", (user_id,)).fetchone())
            conn.close()

            return self._send_json({
                'status': 'success',
                'message': 'Đăng ký tài khoản thành công!',
                'token': new_token,
                'user': new_user
            })

        # 2. Login API
        elif path == '/api/auth/login':
            email = payload.get('email', '').strip()
            password = payload.get('password', '').strip()

            if not email or not password:
                return self._send_json({'status': 'error', 'message': 'Vui lòng nhập Email và Mật khẩu!'}, 400)

            pwd_hash = hash_password(password)
            conn = get_db_connection()
            cursor = conn.cursor()
            
            row = cursor.execute("SELECT id, username, email, full_name, role, streak, xp, gems FROM users WHERE (email = ? OR username = ?) AND password_hash = ?", (email, email, pwd_hash)).fetchone()
            
            if not row:
                conn.close()
                return self._send_json({'status': 'error', 'message': 'Email/Tên đăng nhập hoặc mật khẩu không chính xác!'}, 401)

            logged_user = dict(row)
            new_token = secrets.token_hex(24)
            cursor.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (new_token, logged_user['id']))
            conn.commit()
            conn.close()

            return self._send_json({
                'status': 'success',
                'message': 'Đăng nhập thành công!',
                'token': new_token,
                'user': logged_user
            })

        # 3. Save Progress API
        elif path == '/api/progress':
            if not user:
                return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)

            lang = payload.get('lang', 'EN')
            week_num = payload.get('week_num', 1)
            r_pct = payload.get('reading_percent', 0)
            l_pct = payload.get('listening_percent', 0)
            w_pct = payload.get('writing_percent', 0)
            rp_pct = payload.get('roleplay_percent', 0)

            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO user_progress (user_id, lang, week_num, reading_percent, listening_percent, writing_percent, roleplay_percent)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id, lang, week_num) DO UPDATE SET
                reading_percent = excluded.reading_percent,
                listening_percent = excluded.listening_percent,
                writing_percent = excluded.writing_percent,
                roleplay_percent = excluded.roleplay_percent,
                updated_at = CURRENT_TIMESTAMP
            """, (user['id'], lang, week_num, r_pct, l_pct, w_pct, rp_pct))
            conn.commit()
            conn.close()

            return self._send_json({'status': 'success', 'message': 'Đã đồng bộ tiến trình vào Database!'})

        # 4. Save Vocab API
        elif path == '/api/vocab':
            if not user:
                return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)

            v_id = payload.get('id', 'vocab-' + str(int(secrets.token_hex(4), 16)))
            lang = payload.get('lang', 'EN')
            word = payload.get('word', '').strip()
            phonetic = payload.get('phonetic', '')
            trans_vi = payload.get('translation_vi', '').strip()
            exp_en = payload.get('explanation_en', '')
            ex_sent = payload.get('example_sentence', '')
            ex_trans = payload.get('example_translation', '')
            mastery = payload.get('mastery_level', 1)

            if not word or not trans_vi:
                return self._send_json({'status': 'error', 'message': 'Thiếu từ vựng hoặc nghĩa tiếng Việt!'}, 400)

            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO vocab_vault (id, user_id, lang, word, phonetic, translation_vi, explanation_en, example_sentence, example_translation, mastery_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                mastery_level = excluded.mastery_level,
                translation_vi = excluded.translation_vi
            """, (v_id, user['id'], lang, word, phonetic, trans_vi, exp_en, ex_sent, ex_trans, mastery))
            conn.commit()
            conn.close()

            return self._send_json({'status': 'success', 'message': 'Đã lưu từ vựng vào Cơ sở dữ liệu!'})

        # 5. SRS Rate Vocab API
        elif path == '/api/vocab/srs-rate':
            if not user:
                return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)

            v_id = payload.get('id')
            mastery = payload.get('mastery_level', 1)
            
            conn = get_db_connection()
            conn.execute("UPDATE vocab_vault SET mastery_level = ? WHERE id = ? AND user_id = ?", (mastery, v_id, user['id']))
            conn.commit()
            conn.close()

            return self._send_json({'status': 'success', 'message': 'Cập nhật Mastery SRS thành công!'})

        # 6. Save Roleplay Evaluation API
        elif path == '/api/roleplay/evaluate':
            if not user:
                return self._send_json({'status': 'error', 'message': 'Chưa đăng nhập'}, 401)

            lang = payload.get('lang', 'EN')
            week_num = payload.get('week_num', 1)
            u_resp = payload.get('user_response', '')
            std_ans = payload.get('standard_answer', '')
            nat_ans = payload.get('native_answer', '')
            score = payload.get('score', 85)
            fb_json = json.dumps(payload.get('feedback', {}), ensure_ascii=False)

            conn = get_db_connection()
            conn.execute("""
            INSERT INTO roleplay_history (user_id, lang, week_num, user_response, standard_answer, native_answer, ai_feedback_json, score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (user['id'], lang, week_num, u_resp, std_ans, nat_ans, fb_json, score))
            
            # Award +15 XP for completing roleplay!
            conn.execute("UPDATE users SET xp = xp + 15 WHERE id = ?", (user['id'],))
            conn.commit()
            conn.close()

            return self._send_json({'status': 'success', 'message': 'Lưu kết quả Roleplay 30s & nhận +15 XP thành công!'})

        else:
            return self._send_json({'status': 'error', 'message': 'API route not found'}, 404)

def run_server():
    init_database()
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, CapstoneRequestHandler)
    print("======================================================================")
    print(f"  CAPSTONE BACKEND SERVER RUNNING AT: http://localhost:{PORT}")
    print("  Database: database.db (SQLite3 Relational Storage Enabled)")
    print("======================================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Backend Server...")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
