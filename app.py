from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime, timedelta
import sqlite3
import bcrypt

app = Flask(__name__)

# Database configuration
DATABASE = 'users.db'

# Helper function to connect to the database
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Enable named column access
    return conn

# Initialize the database and create tables if they don’t exist
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/save_capsule', methods=['POST'])
def save_capsule():
    data = request.get_json()
    username = data['username']
    question1 = data['question1']
    question2 = data['question2']
    question3 = data['question3']
    question4 = data['question4']
    question5 = data['question5']
    timer = data['timer']

    if timer == "5_seconds":
        expiration_date = datetime.now() + timedelta(seconds=5)
    elif timer == "1_year":
        expiration_date = datetime.now() + timedelta(days=365)
    elif timer == "5_years":
        expiration_date = datetime.now() + timedelta(days=5*365)
    else:
        expiration_date = None

    conn = get_db_connection()
    conn.execute('''
        INSERT INTO capsules (username, question1, question2, question3, question4, question5, expiration_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (username, question1, question2, question3, question4, question5, expiration_date))
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': 'Capsule saved successfully'})

@app.route('/get_capsules', methods=['GET'])
def get_capsules():
    username = request.args.get('username')

    conn = get_db_connection()
    capsules = conn.execute('SELECT * FROM capsules WHERE username = ?', (username,)).fetchall()
    conn.close()

    # Convert each capsule row to a dictionary
    capsules_list = [{'id': row['id'], 'question1': row['question1'], 'question2': row['question2'],
                      'question3': row['question3'], 'question4': row['question4'], 'question5': row['question5'],
                      'expiration_date': row['expiration_date']}
                     for row in capsules]

    return jsonify({'capsules': capsules_list})

# Route for the index page
@app.route('/')
def home():
    return render_template('index.html')  # Render the homepage

# Route for the login page (GET request for the HTML form)
@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')  # Render the login page

# Route to handle login or registration (POST request)
@app.route('/login', methods=['POST'])
def login_or_register():
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Fetch user data from the database
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()

    if user:
        # User exists, check the password
        if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            conn.close()
            return jsonify({'success': True, 'redirect': url_for('dashboard')})
        else:
            conn.close()
            return jsonify({'success': False, 'error': 'Incorrect password'}), 400
    else:
        # User does not exist, create a new user
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'User registered successfully', 'redirect': url_for('dashboard')})

# Route for the dashboard page (after successful login)
@app.route('/dashboard', methods=['GET'])
def dashboard():
    return render_template('dashboard.html')  # Render the dashboard page

# Initialize the database and run the server
if __name__ == '__main__':
    # Ensure the 'capsules' table exists with five questions
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS capsules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            question1 TEXT,
            question2 TEXT,
            question3 TEXT,
            question4 TEXT,
            question5 TEXT,
            expiration_date TEXT
        )
    ''')
    conn.commit()
    conn.close()
    app.run(debug=True, port=5001)
