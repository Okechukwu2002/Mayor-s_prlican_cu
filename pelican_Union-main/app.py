from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import sqlite3
import datetime
import random
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = "supersecretkey"

UPLOAD_FOLDER = "static/uploads"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_confirmation_code():
    return str(random.randint(100000, 999999))


def get_db_connection():
    conn = sqlite3.connect('pbank.db')
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with app.app_context():
        db = get_db_connection()
        db.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                debit_card TEXT,
                expiry_date TEXT,
                cvv TEXT,
                balance REAL DEFAULT 0,
                profile_picture TEXT,
                is_frozen INTEGER DEFAULT 0
            )
        ''')
        db.execute('''
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                account_name TEXT,
                account_number TEXT,
                routing_number TEXT,
                transaction_amount REAL,
                transaction_time TEXT,
                bank_name TEXT,
                confirmation_code TEXT,
                is_confirmed INTEGER DEFAULT 0,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        ''')
        db.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender_id INTEGER,
                receiver_id INTEGER,
                message TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_read INTEGER DEFAULT 0,
                FOREIGN KEY(sender_id) REFERENCES users(id),
                FOREIGN KEY(receiver_id) REFERENCES users(id)
            )
        ''')
        db.commit()


def send_confirmation_email(to_email, confirmation_code):
    from_email = "jetsamjoseph@gmail.com"
    from_password = "oluwatobiloba"
    subject = "Transfer Confirmation Code"
    body = f"Your transfer confirmation code is: {confirmation_code}"

    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(from_email, from_password)
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")


@app.route('/init_db')
def init_database():
    init_db()
    return "Database initialized successfully."


@app.route('/deposit', methods=['POST', 'GET'])
def deposit():
    if 'user_id' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 401
    return render_template('deposit.html')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        hashed_password = generate_password_hash(password)

        db = get_db_connection()
        db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                   (username, email, hashed_password))
        db.commit()
        db.close()
        flash("Signup successful! Please log in.", "success")
        return redirect(url_for('register'))

    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        db = get_db_connection()
        user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        db.close()

        if user and check_password_hash(user['password'], password):
            if user['is_frozen']:
                flash("Account is frozen. Please contact admin.", "danger")
                return redirect(url_for('login'))

            session['username'] = user['username']
            session['user_id'] = user['id']
            session['is_admin'] = (username == 'Mayor')
            flash("Login successful!", "success")
            return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
        else:
            flash("Login failed. Check your credentials.", "danger")
            return redirect(url_for('login'))
    return render_template('login.html')


@app.route('/user_dashboard')
def user_dashboard():
    if 'user_id' not in session:
        flash("Please log in to access your dashboard.", "danger")
        return redirect(url_for('login'))

    user_id = session['user_id']
    conn = get_db_connection()

    try:
        user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
                            (user_id,)).fetchone()

        if not user:
            flash("User not found.", "danger")
            return redirect(url_for('login'))

        profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
        transactions = conn.execute(
            "SELECT account_name, transaction_amount, transaction_time, confirmation_code FROM transactions WHERE user_id = ?",
            (user_id,)).fetchall()
        messages = conn.execute(
            "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
            (user_id, user_id)).fetchall()
        new_messages = conn.execute(
            "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
            (user_id,)).fetchone()['count']

        conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
        conn.commit()
    except sqlite3.Error as e:
        flash(f"Database error: {str(e)}", "danger")
        return redirect(url_for('login'))
    finally:
        conn.close()

    return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)


@app.route('/send_message', methods=['POST'])
def send_message():
    if 'user_id' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 401

    user_id = session['user_id']
    message = request.form['message']
    receiver_id = 1  # Assuming admin has user_id 1

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
        (user_id, receiver_id, message))
    conn.commit()
    conn.close()

    flash("Message sent successfully.", "success")
    return redirect(url_for('user_dashboard'))


@app.route('/reply_message', methods=['POST'])
def reply_message():
    if 'username' not in session or not session.get('is_admin'):
        return jsonify({"success": False, "message": "Admin not logged in"}), 401

    sender_id = session['user_id']
    message = request.form['message']
    receiver_id = request.form['receiver_id']

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
        (sender_id, receiver_id, message))
    conn.commit()
    conn.close()

    flash("Reply sent successfully.", "success")
    return redirect(url_for('admin_dashboard'))


@app.route('/transfer', methods=['GET', 'POST'])
def transfer():
    if 'user_id' not in session:
        flash("Please log in to make a transfer.", "danger")
        return redirect(url_for('login'))

    if request.method == 'POST':
        sender_id = session['user_id']
        bank_name = request.form['bank_name']
        account_name = request.form['account_name']
        account_number = request.form['account_number']
        routing_number = request.form['routing_number']
        amount = -abs(float(request.form['transaction_amount']))  # Ensure the amount is negative

        conn = get_db_connection()
        try:
            conn.execute("BEGIN")
            sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()

            if sender['balance'] < abs(amount):  # Compare with the absolute value of the amount
                flash("Insufficient funds!", "danger")
                conn.execute("ROLLBACK")
                return redirect(url_for('user_dashboard'))

            confirmation_code = generate_confirmation_code()
            print(confirmation_code)
            conn.execute(
                "INSERT INTO transactions (user_id, account_number, account_name, routing_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (sender_id, account_number, account_name, routing_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
            conn.commit()

            # Send confirmation code to admin email
            admin_email = "jetsamjoseph@gmail.com"
            send_confirmation_email(admin_email, confirmation_code)

            flash("Transfer initiated! Confirmation code sent to admin email.", "success")
        except Exception as e:
            conn.execute("ROLLBACK")
            flash(f"An error occurred: {str(e)}", "danger")
        finally:
            conn.close()

        return redirect(url_for('confirmation'))

    return render_template('transfer.html')


@app.route('/confirmation', methods=['GET', 'POST'])
def confirmation():
    if request.method == 'POST':
        confirmation_code = request.form['confirmation_code']
        user_id = session['user_id']

        conn = get_db_connection()
        try:
            transaction = conn.execute(
                "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
                (user_id, confirmation_code)).fetchone()
            if not transaction:
                flash("Invalid confirmation code.", "danger")
                return redirect(url_for('confirmation'))

            user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
            amount = transaction['transaction_amount']

            if user['balance'] < amount:
                flash("Insufficient funds.", "danger")
                return redirect(url_for('confirmation'))

            new_balance = user['balance'] + amount
            conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
            conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
            conn.commit()
            receipt_id = generate_confirmation_code()

            flash("Transfer completed successfully.", "success")
            return redirect(url_for('user_dashboard'))
        except sqlite3.Error as e:
            flash(f"An error occurred: {str(e)}", "danger")
            return redirect(url_for('confirmation'))
        finally:
            conn.close()

    return render_template('confirmation.html')


@app.route('/complete_transfer', methods=['POST'])
def complete_transfer():
    if request.is_json:
        data = request.get_json()
        confirmation_code = data['confirmation_code']
        user_id = session['user_id']

        conn = get_db_connection()
        try:
            transaction = conn.execute(
                "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
                (user_id, confirmation_code)).fetchone()
            if not transaction:
                return jsonify({"success": False, "message": "Invalid confirmation code."})

            user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id)).fetchone()
            amount = transaction['transaction_amount']

            if user['balance'] < amount:
                return jsonify({"success": False, "message": "Insufficient funds."})

            new_balance = user['balance'] - amount
            conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
            conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
            conn.commit()
            receipt_id = generate_confirmation_code()
            return jsonify({"success": True, "receipt_id": receipt_id})
        except sqlite3.Error as e:
            return jsonify({"success": False, "message": str(e)})
        finally:
            conn.close()
    else:
        return jsonify({"success": False, "message": "Request must be JSON"})


@app.route('/admin_dashboard')
def admin_dashboard():
    if 'username' not in session or not session.get('is_admin'):
        return redirect(url_for('login'))

    conn = get_db_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    transactions = conn.execute(
        "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
    messages = conn.execute(
        "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
    conn.close()

    return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)


@app.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = get_user_from_db(user_id)
    return jsonify(user)


@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    delete_user_from_db(user_id)
    return '', 204


def get_user_from_db(user_id):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    conn.close()
    if user:
        return {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "balance": user["balance"]
        }
    return {}


def delete_user_from_db(user_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
    conn.commit()
    conn.close()


@app.route("/get_transactions")
def get_transactions():
    connection = sqlite3.connect('pbank.db')
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()
    cursor.execute("""
        SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
        FROM transactions
        JOIN users ON transactions.user_id = users.id
    """)
    transactions = cursor.fetchall()
    connection.close()

    return jsonify([dict(transaction) for transaction in transactions])


@app.route("/get_users")
def get_users():
    connection = sqlite3.connect('pbank.db')
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    connection.close()

    return jsonify([dict(user) for user in users])


@app.route('/edit_user', methods=['POST'])
def edit_user():
    user_id = request.form['id']
    username = request.form['username']
    email = request.form['email']
    balance = float(request.form['balance'])
    password = request.form['password']

    conn = get_db_connection()
    user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()

    if not user:
        flash("User not found.", "danger")
        return redirect(url_for('admin_dashboard'))

    previous_balance = user['balance']

    conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
                 (username, email, balance, user_id))

    if password:
        hashed_password = generate_password_hash(password)
        conn.execute('UPDATE users SET password=? WHERE id=?', (hashed_password, user_id))

    # Record balance change as a transaction
    if balance != previous_balance:
        transaction_amount = balance - previous_balance
        conn.execute(
            "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
        )

    conn.commit()
    conn.close()

    flash("User updated successfully.", "success")
    return redirect(url_for('admin_dashboard'))


@app.route('/freeze_user/<int:user_id>', methods=['POST'])
def freeze_user(user_id):
    if 'username' not in session or not session.get('is_admin'):
        return redirect(url_for('login'))

    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    new_status = 0 if user['is_frozen'] else 1
    conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
    conn.commit()
    conn.close()

    status_text = "frozen" if new_status == 1 else "unfrozen"
    flash(f"User {user['username']} has been {status_text}.", "info")
    return redirect(url_for('admin_dashboard'))


@app.route('/logout_user/<int:user_id>', methods=['POST'])
def logout_user(user_id):
    if 'username' not in session or not session.get('is_admin'):
        return redirect(url_for('login'))

    session.pop('user_id', None)
    flash("User has been logged out.", "info")
    return redirect(url_for('admin_dashboard'))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        debit_card = request.form["debit_card"]
        expiry_date = request.form["expiry_date"]
        cvv = request.form["cvv"]
        profile_picture = None

        if 'profile_picture' in request.files:
            file = request.files['profile_picture']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                profile_picture = filename
            else:
                flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
                return redirect(request.url)

        db = get_db_connection()
        db.execute(
            "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
            (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
        )
        db.commit()
        db.close()

        flash("Profile updated successfully!", "success")
        return redirect(url_for("user_dashboard"))

    return render_template("register.html")


@app.route('/admin_logout', methods=['GET'])
def admin_logout():
    session.pop('username', None)
    session.pop('user_id', None)
    session.pop('is_admin', None)
    flash("Admin logged out successfully!", "success")
    return redirect(url_for('login'))


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
