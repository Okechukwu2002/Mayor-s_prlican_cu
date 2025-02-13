<<<<<<< HEAD
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# from flask_mail import Mail, Message
# import random
# import os
# from werkzeug.utils import secure_filename
#
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
#
# # Flask email configuration
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'jetsamjoseph@gmail.com'
# app.config['MAIL_PASSWORD'] = 'oluwatobiloba'
# app.config['MAIL_DEFAULT_SENDER'] = 'jetsamjoseph@gmail.com'
#
# mail = Mail(app)
#
#
# # Ensure the upload folder exists
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# # app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
#
# # Ensure the folder exists
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# # Check if file extension is allowed
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
#
#
# # Function to generate a random 6-digit confirmation code
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# # Function to connect to the database
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# # Initialize the database
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#
#         # Create users table
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#
#         # Create transactions table
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#
#         # Create transfer_codes table
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transfer_codes (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 code TEXT,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY (user_id) REFERENCES users(id)
#             )
#         ''')
#
#         db.commit()
#
#
# # Route to initialize the database (you can call this once to initialize your DB)
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# # Deposit Route
# # Deposit Route (POST Request)
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     # data = request.json
#     # amount = float(data['amount'])
#     # method = data['method']
#     # user_id = session['user_id']
#
#     #
#     # if amount <= 0:
#     #     return jsonify({"success": False, "message": "Invalid deposit amount!"})
#
#     # try:
#     #     conn = get_db_connection()
#     #     cursor = conn.cursor()
#     #     # Record the deposit transaction
#     #     cursor.execute("INSERT INTO transactions (user_id, amount, method, type) VALUES (?, ?, ?, ?)",
#     #                    (user_id, amount, method, 'deposit'))
#     #
#     #     # Update user's balance
#     #     cursor.execute("UPDATE users SET balance = balance + ? WHERE id = ?", (amount, user_id))
#     #
#     #     conn.commit()
#     #     conn.close()
#     #     return jsonify({"success": True, "message": "Deposit successful!"})
#     # except Exception as e:
#     #     return jsonify({"success": False, "message": str(e)}), 500
#     return render_template('deposit.html')
#
#
# # Home route
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# # Signup route
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
# # Login route
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# # Register card route
# # @app.route('/register', methods=['GET', 'POST'])
# # def register():
# #     if request.method == 'POST':
# #         debit_card = request.form['debit_card']
# #         expiry_date = request.form['expiry_date']
# #         cvv = request.form['cvv']
# #         profile_picture = request.files['profile_picture']
# #
# #         if profile_picture:
# #             picture_filename = f"{profile_picture.filename}"
# #             picture_path = os.path.join(app.config['UPLOAD_FOLDER'], picture_filename)
# #             profile_picture.save(picture_path)
# #         else:
# #             picture_filename = None
# #
# #         db = get_db_connection()
# #         db.execute("UPDATE users SET debit_card = ?, profile_picture =?, expiry_date = ?, cvv = ? WHERE id = ?",
# #                    (debit_card, expiry_date, profile_picture, cvv, session['user_id']))
# #         db.commit()
# #         db.close()
# #         return redirect(url_for('login'))
# #
# #     return render_template('register.html')
#
# # User dashboard route
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         # Fetch user details
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         # Profile picture fallback
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#
#         # Fetch transactions for the logged-in user
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
# #
# # @app.route('/transfer', methods=['GET', 'POST'])
# # def transfer():
# #     if 'user_id' not in session:
# #         flash("Please log in to make a transfer.", "danger")
# #         return redirect('/login')
# #
# #     if request.method == 'POST':
# #         sender_id = session['user_id']
# #         bank_name = request.form['bank_name']
# #         account_number = request.form['account_number']
# #         amount = float(request.form['amount'])
# #         timestamp = datetime.datetime.now()
# #         email = request.form.get('email')  # Email required for confirmation
# #
# #         if not email:
# #             flash("Email is required for confirmation.", "danger")
# #             return redirect('/transfer')
# #
# #         # Generate confirmation code
# #         confirmation_code = generate_confirmation_code()
# #
# #         # Send confirmation code via email to the user
# #         msg = Message('Your Transfer Confirmation Code', recipients=[email])
# #         msg.body = f"Your confirmation code is: {confirmation_code}"
# #
# #         try:
# #             mail.send(msg)
# #             print(f"Confirmation code sent to: {email}")
# #         except Exception as e:
# #             print(f"Error sending email: {e}")
# #             flash("Error sending confirmation code.", "danger")
# #             return redirect('/transfer')
# #
# #         # Store transaction and confirmation code in the database
# #         conn = get_db_connection()
# #         cursor = conn.cursor()
# #
# #         cursor.execute("""
# #             INSERT INTO transactions (user_id, account_name, account_number, transaction_amount, transaction_time, bank_name)
# #             VALUES (?, ?, ?, ?, ?, ?)""",
# #                        (sender_id, bank_name, account_number, amount, timestamp, bank_name))
# #
# #         # Ensure transfer_codes table exists
# #         cursor.execute("""
# #             CREATE TABLE IF NOT EXISTS transfer_codes (
# #                 id INTEGER PRIMARY KEY AUTOINCREMENT,
# #                 user_id INTEGER,
# #                 confirmation_code TEXT,
# #                 transaction_amount REAL,
# #                 bank_name TEXT,
# #                 timestamp TEXT,
# #                 account_number TEXT,
# #                 status TEXT DEFAULT 'Pending',
# #                 FOREIGN KEY(user_id) REFERENCES users(id)
# #             )""")
# #
# #         # Store confirmation code for admin review
# #         cursor.execute("""
# #             INSERT INTO transfer_codes (user_id, confirmation_code, transaction_amount, bank, timestamp, account_number)
# #             VALUES (?, ?, ?, ?, ?, ?)""",
# #                        (sender_id, confirmation_code, amount, bank_name, timestamp, account_number))
# #
# #         conn.commit()
# #         conn.close()
# #
# #         flash("Transfer initiated. Confirmation code sent.", "success")
# #         return redirect('/user_dashboard')
# #
# #     return render_template('transfer.html')
#
#
#
# # Transfer funds (with Freeze Check)
# # @app.route('/transfer', methods=['GET', 'POST'])
# # def transfer():
# #     if 'user_id' not in session:
# #         flash("Please log in to make a transfer.", "danger")
# #         return redirect(url_for('login'))
# #
# #     if request.method == 'POST':
# #         sender_id = session['user_id']
# #         account_number = request.form['account_number']
# #         bank_name = request.form['bank']
# #         transaction_amount = float(request.form['transaction_amount'])
# #
# #         conn = get_db_connection()
# #         cursor = conn.cursor()
# #
# #         # Fetch sender's balance
# #         cursor.execute("SELECT balance FROM users WHERE id = ?", (sender_id,))
# #         sender = cursor.fetchone()
# #
# #         if sender is None:
# #             flash("User not found!", "danger")
# #             conn.close()
# #             return redirect(url_for('transfer'))
# #
# #         sender_balance = sender["balance"]
# #         print(f"DEBUG: Sender's current balance = {sender_balance}")
# #
# #         # Check if sender has enough balance
# #         if sender_balance < transaction_amount:
# #             flash("Insufficient balance!", "danger")
# #             conn.close()
# #             return redirect(url_for('user_dashboard'))
# #
# #         # Deduct amount from sender
# #         new_sender_balance = sender_balance - transaction_amount
# #         print(f"DEBUG: New sender balance after deduction = {new_sender_balance}")
# #
# #         cursor.execute("UPDATE users SET balance = ? WHERE id = ?", (new_sender_balance, sender_id))
# #         conn.commit()
# #
# #         # Verify if balance was updated
# #         cursor.execute("SELECT balance FROM users WHERE id = ?", (sender_id,))
# #         updated_balance = cursor.fetchone()["balance"]
# #         print(f"DEBUG: Sender's balance after update = {updated_balance}")
# #
# #         if updated_balance != new_sender_balance:
# #             print("ERROR: Balance update failed!")
# #
# #         # Insert transaction into transactions table
# #         cursor.execute("""
# #             INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time)
# #             VALUES (?, ?, ?, ?, ?)
# #         """, (sender_id, account_number, bank_name, transaction_amount, datetime.datetime.now()))
# #
# #         conn.commit()
# #         conn.close()
# #
# #         flash("Transfer successful!", "success")
# #         return redirect(url_for('user_dashboard'))
# #
# #     return render_template('transfer.html')
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#         if sender['balance'] < amount:
#             flash("Insufficient funds!", "danger")
#             conn.close()
#             return redirect(url_for('user_dashboard'))
#
#         new_balance = sender['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, sender_id))
#
#         # confirmation_code = generate_confirmation_code()
#         conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time) VALUES (?, ?, ?, ?, ?)",
#                      (sender_id, account_number, bank_name, amount, datetime.datetime.now()))
#         conn.commit()
#         conn.close()
#
#         flash("Transfer successful!", "success")
#         return redirect(url_for('user_dashboard'))
#
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
#
#
#
# # Admin Dashboard Route
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT * FROM transactions").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)  # Example function
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)  # Example function
#     return '', 204
# #
# # @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# # def freeze_user(user_id):
# #     freeze_user_in_db(user_id)  # Example function
# #     return '', 204
#
# # @app.route('/logout_user/<int:user_id>', methods=['POST'])
# # def logout_user(user_id):
# #     logout_user_from_db(user_id)  # Example function
# #     return '', 204
#
#
# import sqlite3
#
# # Connect to your SQLite database
# def get_db_connection():
#     conn = sqlite3.connect('your_database.db')  # Replace with your actual DB file path
#     conn.row_factory = sqlite3.Row  # Allows access to columns by name
#     return conn
#
# # Function to get user data from the database
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# # Function to delete a user from the database
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# # Function to freeze a user (could involve setting an 'active' flag to False or similar)
# def freeze_user_in_db(user_id):
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET active = ? WHERE id = ?', (False, user_id))
#     conn.commit()
#     conn.close()
#
# # Function to log out a user (depending on your session management, this could vary)
# def logout_user_from_db(user_id):
#     # This can be more complex if you have session management in place
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET session_active = ? WHERE id = ?', (False, user_id))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('your_database.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, transactions.amount, transactions.date, users.username
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])  # Convert rows to dicts for JSON response
#
#
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('your_database.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")  # Adjust based on your actual table structure
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])  # Convert rows to dicts for JSON response
#
#
# # Edit User Details (Admin Only)
# # @app.route('/edit_user/<int:user_id>', methods=['GET', 'POST'])
# # def edit_user(user_id):
# #     if 'username' not in session or not session.get('is_admin'):
# #         return redirect(url_for('login'))
# #
# #     conn = get_db_connection()
# #     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
# #
# #     if request.method == 'POST':
# #         username = request.form['username']
# #         email = request.form['email']
# #         password = request.form['password']
# #         balance = request.form['balance']
# #         debit_card = request.form['debit_card']
# #         expiry_date = request.form['expiry_date']
# #         cvv = request.form['cvv']
# #         is_frozen = 1 if request.form.get('is_frozen') else 0
# #         profile_picture = request.files['profile_picture']
# #
# #         if profile_picture:
# #             picture_filename = f"{user_id}_{profile_picture.filename}"
# #             picture_path = os.path.join(app.config['UPLOAD_FOLDER'], picture_filename)
# #             profile_picture.save(picture_path)
# #             conn.execute("UPDATE users SET profile_picture = ? WHERE id = ?", (picture_filename, user_id))
# #
# #         conn.execute("""
# #             UPDATE users
# #             SET username = ?, email = ?, password = ?, balance = ?, debit_card = ?, expiry_date = ?, cvv = ?, is_frozen = ?
# #             WHERE id = ?
# #         """, (username, email, password, balance, debit_card, expiry_date, cvv, is_frozen, user_id))
# #
# #         conn.commit()
# #         conn.close()
# #
# #         flash("User details updated successfully!", "success")
# #         return redirect(url_for('admin_dashboard'))
# #
# #     conn.close()
# #     return render_template('edit_user.html', user=user)
#
#
#
# # @app.route('/edit_user/<int:user_id>', methods=['POST'])
# # def edit_user(user_id):
# #     data = request.json
# #     conn = get_db_connection()
# #     conn.execute('UPDATE users SET username = ?, email = ?, balance = ? WHERE id = ?',
# #                  (data['username'], data['email'], data['balance'], user_id))
# #     conn.commit()
# #     conn.close()
# #     return jsonify({'message': 'User updated successfully'})
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     # fullname = request.form['fullname']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# # Freeze/Unfreeze User Account (Admin Only)
# @app.route('/freeze_user/<int:user_id>')
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1  # Toggle freeze status
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# # Logout a User (Admin Only)
# @app.route('/logout_user/<int:user_id>')
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)  # Force user logout
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# # Transfer funds (with Freeze Check)
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         # profile_picture = request.files["profile_picture"]
#         profile_picture = None
#
#         # Validate if profile picture is uploaded and allowed
#         picture_filename = None
#         # if profile_picture and allowed_file(profile_picture.filename):
#         #     picture_filename = secure_filename(profile_picture.filename)
#         #     picture_path = os.path.join(app.config["UPLOAD_FOLDER"], picture_filename)
#         #     profile_picture.save(picture_path)
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#
#         else:
#             flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#             return redirect(request.url)
#
#         # Store details in database
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")# Send Confirmation Code to Admin
# def send_admin_email(account_name, account_number, routing_number, transaction_amount, bank, confirmation_code):
#     admin_email = "jetsamjoseph@gmail.com"
#     subject = "New Transfer Initiated"
#     body = f"""
#     A new transfer has been initiated:
#
#     Account Name: {account_name}
#     Account Number: {account_number}
#     Amount: ${transaction_amount}
#     Bank: {bank}
#     Confirmation Code: {confirmation_code}
#
#     Please verify this transaction in the admin dashboard.
#     """
#     try:
#         msg = Message(subject, recipients=[admin_email])
#         msg.body = body
#         mail.send(msg)
#     except Exception as e:
#         print(f"Error sending email: {e}")
#
#
#
#
# # Admin Logout Functionality
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
#
#
#
# if __name__ == "__main__":
#     init_db()  # Initialize the database when the app starts
#     app.run(debug=True)


#
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# from flask_mail import Mail, Message
# import random
# import os
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# # Flask email configuration
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'jetsamjoseph@gmail.com'
# app.config['MAIL_PASSWORD'] = 'oluwatobiloba'
# app.config['MAIL_DEFAULT_SENDER'] = 'jetsamjoseph@gmail.com'
#
# mail = Mail(app)
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transfer_codes (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 code TEXT,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY (user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             new_balance = sender['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, sender_id))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                          (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             send_admin_email(account_number, bank_name, confirmation_code)
#             flash("Transfer successful!", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('user_dashboard'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
# def send_admin_email(account_number, bank_name, confirmation_code):
#     admin_email = "jetsamjoseph@gmail.com"
#     subject = "New Transfer Initiated"
#     body = f"""
#     A new transfer has been initiated:
#
#     Account Number: {account_number}
#     Bank: {bank_name}
#     Confirmation Code: {confirmation_code}
#
#     Please verify this transaction in the admin dashboard.
#     """
#     try:
#         msg = Message(subject, recipients=[admin_email])
#         msg.body = body
#         mail.send(msg)
#     except Exception as e:
#         print(f"Error sending email: {e}")
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)



# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# from flask_mail import Mail, Message
# import random
# import os
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# # Flask email configuration
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'jetsamjoseph@gmail.com'
# app.config['MAIL_PASSWORD'] = 'oluwatobiloba'
# app.config['MAIL_DEFAULT_SENDER'] = 'jetsamjoseph@gmail.com'
#
# mail = Mail(app)
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transfer_codes (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 code TEXT,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY (user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             new_balance = sender['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, sender_id))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                          (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             send_admin_email(account_number, bank_name, confirmation_code)
#             flash("Transfer successful! Confirmation code: " + confirmation_code, "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('user_dashboard'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
# def send_admin_email(account_number, bank_name, confirmation_code):
#     admin_email = "jetsamjoseph@gmail.com"
#     subject = "New Transfer Initiated"
#     body = f"""
#     A new transfer has been initiated:
#
#     Account Number: {account_number}
#     Bank: {bank_name}
#     Confirmation Code: {confirmation_code}
#
#     Please verify this transaction in the admin dashboard.
#     """
#     try:
#         msg = Message(subject, recipients=[admin_email])
#         msg.body = body
#         mail.send(msg)
#     except Exception as e:
#         print(f"Error sending email: {e}")
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)



# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# from flask_mail import Mail, Message
# import random
# import os
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# # Flask email configuration
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'jetsamjoseph@gmail.com'
# app.config['MAIL_PASSWORD'] = 'oluwatobiloba'
# app.config['MAIL_DEFAULT_SENDER'] = 'jetsamjoseph@gmail.com'
#
# mail = Mail(app)
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transfer_codes (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 code TEXT,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY (user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                          (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             send_admin_email(account_number, bank_name, confirmation_code)
#             flash("Transfer initiated! Confirmation code sent to admin.", "success")
#             localStorage.setItem('confirmationCodeFromAdmin', confirmation_code)
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     amount = data['amount']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
# def send_admin_email(account_number, bank_name, confirmation_code):
#     admin_email = "jetsamjoseph@gmail.com"
#     subject = "New Transfer Initiated"
#     body = f"""
#     A new transfer has been initiated:
#
#     Account Number: {account_number}
#     Bank: {bank_name}
#     Confirmation Code: {confirmation_code}
#
#     Please verify this transaction in the admin dashboard.
#     """
#     try:
#         msg = Message(subject, recipients=[admin_email])
#         msg.body = body
#         mail.send(msg)
#     except Exception as e:
#         print(f"Error sending email: {e}")
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)





# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             new_balance = sender['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, sender_id))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                          (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             flash("Transfer successful! Confirmation code: " + confirmation_code, "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     amount = data['amount']
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute("SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ?",
#                                    (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)



#
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('login'))
#
#     return render_template('signup.html')
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                          (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             flash("Transfer initiated! Confirmation code sent to admin dashboard.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute("SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                                    (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)



#
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
# @app.route('/deposit', methods=['POST','GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute("SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?", (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute("INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                          (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             flash("Transfer initiated! Confirmation code sent to admin dashboard.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     return render_template('confirmation.html')
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute("SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                                    (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute("SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)


# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions)
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute(
#             "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#             (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)




#
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages)
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute(
#             "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#             (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)


# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('bank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages)
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute(
#             "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#             (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('bank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = request.form['balance']
#
#     conn = get_db_connection()
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#     conn.commit()
#     conn.close()
#
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)


# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages)
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute(
#             "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#             (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         conn.execute('UPDATE users SET password=? WHERE id=?', (password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)




# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 is_read INTEGER DEFAULT 0,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, password))
#         db.commit()
#         db.close()
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
#                           (username, password)).fetchone()
#         db.close()
#
#         if user:
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             return "Login failed. Check your credentials."
#     return render_template('login.html')
#
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#         new_messages = conn.execute(
#             "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
#             (user_id,)).fetchone()['count']
#
#         conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
#         conn.commit()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)
#
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     data = request.get_json()
#     confirmation_code = data['confirmation_code']
#     user_id = session['user_id']
#
#     conn = get_db_connection()
#     try:
#         transaction = conn.execute(
#             "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#             (user_id, confirmation_code)).fetchone()
#         if not transaction:
#             return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#         user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#         amount = transaction['transaction_amount']
#
#         if user['balance'] < amount:
#             return jsonify({"success": False, "message": "Insufficient funds."})
#
#         new_balance = user['balance'] - amount
#         conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#         conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#         conn.commit()
#         receipt_id = generate_confirmation_code()
#         return jsonify({"success": True, "receipt_id": receipt_id})
#     except sqlite3.Error as e:
#         return jsonify({"success": False, "message": str(e)})
#     finally:
#         conn.close()
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         conn.execute('UPDATE users SET password=? WHERE id=?', (password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)
#
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 is_read INTEGER DEFAULT 0,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         hashed_password = generate_password_hash(password)
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, hashed_password))
#         db.commit()
#         db.close()
#         flash("Signup successful! Please log in.", "success")
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
#         db.close()
#
#         if user and check_password_hash(user['password'], password):
#             if user['is_frozen']:
#                 flash("Account is frozen. Please contact admin.", "danger")
#                 return redirect(url_for('login'))
#
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor')
#             flash("Login successful!", "success")
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             flash("Login failed. Check your credentials.", "danger")
#             return redirect(url_for('login'))
#     return render_template('login.html')
#
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time, confirmation_code FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#         new_messages = conn.execute(
#             "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
#             (user_id,)).fetchone()['count']
#
#         conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
#         conn.commit()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)
#
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     sender_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (sender_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         routing_number = request.form['routing_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         print("testing")
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             print(confirmation_code)
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, routing_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, routing_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#             print("testing")
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return redirect(url_for('user_dashboard'))
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     if request.is_json:
#         data = request.get_json()
#         confirmation_code = data['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 return jsonify({"success": False, "message": "Insufficient funds."})
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#             return jsonify({"success": True, "receipt_id": receipt_id})
#         except sqlite3.Error as e:
#             return jsonify({"success": False, "message": str(e)})
#         finally:
#             conn.close()
#     else:
#         return jsonify({"success": False, "message": "Request must be JSON"})
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         hashed_password = generate_password_hash(password)
#         conn.execute('UPDATE users SET password=? WHERE id=?', (hashed_password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)




# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 is_read INTEGER DEFAULT 0,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         hashed_password = generate_password_hash(password)
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, hashed_password))
#         db.commit()
#         db.close()
#         flash("Signup successful! Please log in.", "success")
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
#         db.close()
#
#         if user and check_password_hash(user['password'], password):
#             if user['is_frozen']:
#                 flash("Account is frozen. Please contact admin.", "danger")
#                 return redirect(url_for('login'))
#
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor')
#             flash("Login successful!", "success")
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             flash("Login failed. Check your credentials.", "danger")
#             return redirect(url_for('login'))
#     return render_template('login.html')
#
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time, confirmation_code FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#         new_messages = conn.execute(
#             "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
#             (user_id,)).fetchone()['count']
#
#         conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
#         conn.commit()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)
#
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     sender_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (sender_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         routing_number = request.form['routing_number']
#         amount = -abs(float(request.form['transaction_amount']))  # Ensure the amount is negative
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < abs(amount):  # Compare with the absolute value of the amount
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             print(confirmation_code)
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_number, routing_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_number, routing_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "jetsamjoseph@gmail.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Confirmation code sent to admin email.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return redirect(url_for('user_dashboard'))
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     if request.is_json:
#         data = request.get_json()
#         confirmation_code = data['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 return jsonify({"success": False, "message": "Insufficient funds."})
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#             return jsonify({"success": True, "receipt_id": receipt_id})
#         except sqlite3.Error as e:
#             return jsonify({"success": False, "message": str(e)})
#         finally:
#             conn.close()
#     else:
#         return jsonify({"success": False, "message": "Request must be JSON"})
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         hashed_password = generate_password_hash(password)
#         conn.execute('UPDATE users SET password=? WHERE id=?', (hashed_password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)
#

# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 is_read INTEGER DEFAULT 0,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "jetsamjoseph@gmail.com"
#     from_password = "oluwatobiloba"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         hashed_password = generate_password_hash(password)
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, hashed_password))
#         db.commit()
#         db.close()
#         flash("Signup successful! Please log in.", "success")
#         return redirect(url_for('login'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
#         db.close()
#
#         if user and check_password_hash(user['password'], password):
#             if user['is_frozen']:
#                 flash("Account is frozen. Please contact admin.", "danger")
#                 return redirect(url_for('login'))
#
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor')
#             flash("Login successful!", "success")
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             flash("Login failed. Check your credentials.", "danger")
#             return redirect(url_for('login'))
#     return render_template('login.html')
#
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time, confirmation_code, is_confirmed FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#         new_messages = conn.execute(
#             "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
#             (user_id,)).fetchone()['count']
#
#         conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
#         conn.commit()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)
#
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     sender_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (sender_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         account_name = request.form['account_name']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_name, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_name, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             flash("Transfer initiated! Admin will provide the confirmation code.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('user_dashboard'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     if request.is_json:
#         data = request.get_json()
#         confirmation_code = data['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 return jsonify({"success": False, "message": "Insufficient funds."})
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#             return jsonify({"success": True, "receipt_id": receipt_id})
#         except sqlite3.Error as e:
#             return jsonify({"success": False, "message": str(e)})
#         finally:
#             conn.close()
#     else:
#         return jsonify({"success": False, "message": "Request must be JSON"})
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         hashed_password = generate_password_hash(password)
#         conn.execute('UPDATE users SET password=? WHERE id=?', (hashed_password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)








# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import random
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return str(random.randint(100000, 999999))
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 is_read INTEGER DEFAULT 0,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# def send_confirmation_email(to_email, confirmation_code):
#     from_email = "your_email@example.com"
#     from_password = "your_password"
#     subject = "Transfer Confirmation Code"
#     body = f"Your transfer confirmation code is: {confirmation_code}"
#
#     msg = MIMEMultipart()
#     msg["From"] = from_email
#     msg["To"] = to_email
#     msg["Subject"] = subject
#
#     msg.attach(MIMEText(body, "plain"))
#
#     try:
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(from_email, from_password)
#         text = msg.as_string()
#         server.sendmail(from_email, to_email, text)
#         server.quit()
#         print("Email sent successfully")
#     except Exception as e:
#         print(f"Failed to send email: {e}")
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         hashed_password = generate_password_hash(password)
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, hashed_password))
#         db.commit()
#         db.close()
#         flash("Signup successful! Please log in.", "success")
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
#         db.close()
#
#         if user and check_password_hash(user['password'], password):
#             if user['is_frozen']:
#                 flash("Account is frozen. Please contact admin.", "danger")
#                 return redirect(url_for('login'))
#
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor')
#             flash("Login successful!", "success")
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             flash("Login failed. Check your credentials.", "danger")
#             return redirect(url_for('login'))
#     return render_template('login.html')
#
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time, confirmation_code, is_confirmed FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#         new_messages = conn.execute(
#             "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
#             (user_id,)).fetchone()['count']
#
#         conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
#         conn.commit()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)
#
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     sender_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (sender_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         account_name = request.form['account_name']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_name, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_name, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             # Send confirmation code to admin email
#             admin_email = "admin@example.com"
#             send_confirmation_email(admin_email, confirmation_code)
#
#             flash("Transfer initiated! Admin will provide the confirmation code.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('user_dashboard'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=receipt_id, amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/complete_transfer', methods=['POST'])
# def complete_transfer():
#     if request.is_json:
#         data = request.get_json()
#         confirmation_code = data['confirmation_code']
#         user_id = session['user_id']
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 return jsonify({"success": False, "message": "Invalid confirmation code."})
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 return jsonify({"success": False, "message": "Insufficient funds."})
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#             receipt_id = generate_confirmation_code()
#             return jsonify({"success": True, "receipt_id": receipt_id})
#         except sqlite3.Error as e:
#             return jsonify({"success": False, "message": str(e)})
#         finally:
#             conn.close()
#     else:
#         return jsonify({"success": False, "message": "Request must be JSON"})
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         hashed_password = generate_password_hash(password)
#         conn.execute('UPDATE users SET password=? WHERE id=?', (hashed_password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)






#
# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# import sqlite3
# import datetime
# import os
# from werkzeug.utils import secure_filename
# from werkzeug.security import generate_password_hash, check_password_hash
#
# app = Flask(__name__)
#
# app.secret_key = "supersecretkey"
#
# UPLOAD_FOLDER = "static/uploads"
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
#
#
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
#
# def generate_confirmation_code():
#     return "1234"  # Use a fixed confirmation code
#
#
# def get_db_connection():
#     conn = sqlite3.connect('pbank.db')
#     conn.row_factory = sqlite3.Row
#     return conn
#
#
# def init_db():
#     with app.app_context():
#         db = get_db_connection()
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 username TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 password TEXT NOT NULL,
#                 debit_card TEXT,
#                 expiry_date TEXT,
#                 cvv TEXT,
#                 balance REAL DEFAULT 0,
#                 profile_picture TEXT,
#                 is_frozen INTEGER DEFAULT 0
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS transactions (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 user_id INTEGER,
#                 account_name TEXT,
#                 account_number TEXT,
#                 routing_number TEXT,
#                 transaction_amount REAL,
#                 transaction_time TEXT,
#                 bank_name TEXT,
#                 confirmation_code TEXT,
#                 is_confirmed INTEGER DEFAULT 0,
#                 FOREIGN KEY(user_id) REFERENCES users(id)
#             )
#         ''')
#         db.execute('''
#             CREATE TABLE IF NOT EXISTS messages (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 sender_id INTEGER,
#                 receiver_id INTEGER,
#                 message TEXT NOT NULL,
#                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
#                 is_read INTEGER DEFAULT 0,
#                 FOREIGN KEY(sender_id) REFERENCES users(id),
#                 FOREIGN KEY(receiver_id) REFERENCES users(id)
#             )
#         ''')
#         db.commit()
#
#
# @app.route('/init_db')
# def init_database():
#     init_db()
#     return "Database initialized successfully."
#
#
# @app.route('/deposit', methods=['POST', 'GET'])
# def deposit():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#     return render_template('deposit.html')
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#
#         hashed_password = generate_password_hash(password)
#
#         db = get_db_connection()
#         db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
#                    (username, email, hashed_password))
#         db.commit()
#         db.close()
#         flash("Signup successful! Please log in.", "success")
#         return redirect(url_for('register'))
#
#     return render_template('signup.html')
#
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#
#         db = get_db_connection()
#         user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
#         db.close()
#
#         if user and check_password_hash(user['password'], password):
#             if user['is_frozen']:
#                 flash("Account is frozen. Please contact admin.", "danger")
#                 return redirect(url_for('login'))
#
#             session['username'] = user['username']
#             session['user_id'] = user['id']
#             session['is_admin'] = (username == 'Mayor')
#             flash("Login successful!", "success")
#             return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
#         else:
#             flash("Login failed. Check your credentials.", "danger")
#             return redirect(url_for('login'))
#     return render_template('login.html')
#
#
# @app.route('/user_dashboard')
# def user_dashboard():
#     if 'user_id' not in session:
#         flash("Please log in to access your dashboard.", "danger")
#         return redirect(url_for('login'))
#
#     user_id = session['user_id']
#     conn = get_db_connection()
#
#     try:
#         user = conn.execute("SELECT id, username, balance, profile_picture FROM users WHERE id = ?",
#                             (user_id,)).fetchone()
#
#         if not user:
#             flash("User not found.", "danger")
#             return redirect(url_for('login'))
#
#         profile_picture = user['profile_picture'] if user['profile_picture'] else 'default.jpg'
#         transactions = conn.execute(
#             "SELECT account_name, transaction_amount, transaction_time, confirmation_code, is_confirmed FROM transactions WHERE user_id = ?",
#             (user_id,)).fetchall()
#         messages = conn.execute(
#             "SELECT * FROM messages WHERE (sender_id = ? OR receiver_id = ?) ORDER BY timestamp",
#             (user_id, user_id)).fetchall()
#         new_messages = conn.execute(
#             "SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0",
#             (user_id,)).fetchone()['count']
#
#         conn.execute("UPDATE messages SET is_read = 1 WHERE receiver_id = ?", (user_id,))
#         conn.commit()
#     except sqlite3.Error as e:
#         flash(f"Database error: {str(e)}", "danger")
#         return redirect(url_for('login'))
#     finally:
#         conn.close()
#
#     return render_template('user_dashboard.html', profile_picture=profile_picture, user=user, transactions=transactions, messages=messages, new_messages=new_messages)
#
#
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     if 'user_id' not in session:
#         return jsonify({"success": False, "message": "User not logged in"}), 401
#
#     user_id = session['user_id']
#     message = request.form['message']
#     receiver_id = 1  # Assuming admin has user_id 1
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (user_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Message sent successfully.", "success")
#     return redirect(url_for('user_dashboard'))
#
#
# @app.route('/reply_message', methods=['POST'])
# def reply_message():
#     if 'username' not in session or not session.get('is_admin'):
#         return jsonify({"success": False, "message": "Admin not logged in"}), 401
#
#     sender_id = session['user_id']
#     message = request.form['message']
#     receiver_id = request.form['receiver_id']
#
#     conn = get_db_connection()
#     conn.execute(
#         "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
#         (sender_id, receiver_id, message))
#     conn.commit()
#     conn.close()
#
#     flash("Reply sent successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/transfer', methods=['GET', 'POST'])
# def transfer():
#     if 'user_id' not in session:
#         flash("Please log in to make a transfer.", "danger")
#         return redirect(url_for('login'))
#
#     if request.method == 'POST':
#         sender_id = session['user_id']
#         account_name = request.form['account_name']
#         bank_name = request.form['bank_name']
#         account_number = request.form['account_number']
#         amount = float(request.form['transaction_amount'])
#
#         conn = get_db_connection()
#         try:
#             conn.execute("BEGIN")
#             sender = conn.execute("SELECT balance FROM users WHERE id = ?", (sender_id,)).fetchone()
#
#             if sender['balance'] < amount:
#                 flash("Insufficient funds!", "danger")
#                 conn.execute("ROLLBACK")
#                 return redirect(url_for('user_dashboard'))
#
#             confirmation_code = generate_confirmation_code()
#             conn.execute(
#                 "INSERT INTO transactions (user_id, account_name, account_number, bank_name, transaction_amount, transaction_time, confirmation_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
#                 (sender_id, account_name, account_number, bank_name, amount, datetime.datetime.now(), confirmation_code))
#             conn.commit()
#
#             flash("Transfer initiated! Please confirm with the code provided.", "success")
#         except Exception as e:
#             conn.execute("ROLLBACK")
#             flash(f"An error occurred: {str(e)}", "danger")
#         finally:
#             conn.close()
#
#         return redirect(url_for('confirmation'))
#
#     return render_template('transfer.html')
#
#
# @app.route('/confirmation', methods=['GET', 'POST'])
# def confirmation():
#     if request.method == 'POST':
#         confirmation_code = request.form['confirmation_code']
#         user_id = session['user_id']
#
#         if confirmation_code != "1234":
#             flash("Invalid confirmation code.", "danger")
#             return redirect(url_for('confirmation'))
#
#         conn = get_db_connection()
#         try:
#             transaction = conn.execute(
#                 "SELECT * FROM transactions WHERE user_id = ? AND confirmation_code = ? AND is_confirmed = 0",
#                 (user_id, confirmation_code)).fetchone()
#             if not transaction:
#                 flash("Invalid confirmation code.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             user = conn.execute("SELECT balance FROM users WHERE id = ?", (user_id,)).fetchone()
#             amount = transaction['transaction_amount']
#
#             if user['balance'] < amount:
#                 flash("Insufficient funds.", "danger")
#                 return redirect(url_for('confirmation'))
#
#             new_balance = user['balance'] - amount
#             conn.execute("UPDATE users SET balance = ? WHERE id = ?", (new_balance, user_id))
#             conn.execute("UPDATE transactions SET is_confirmed = 1 WHERE id = ?", (transaction['id'],))
#             conn.commit()
#
#             flash("Transfer completed successfully.", "success")
#             return render_template('confirmation.html', receipt_id=transaction['id'], amount=amount)
#         except sqlite3.Error as e:
#             flash(f"An error occurred: {str(e)}", "danger")
#             return redirect(url_for('confirmation'))
#         finally:
#             conn.close()
#
#     return render_template('confirmation.html')
#
#
# @app.route('/admin_dashboard')
# def admin_dashboard():
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     users = conn.execute("SELECT * FROM users").fetchall()
#     transactions = conn.execute(
#         "SELECT transactions.*, users.username as user_name FROM transactions JOIN users ON transactions.user_id = users.id").fetchall()
#     messages = conn.execute(
#         "SELECT messages.*, users.username as sender_name FROM messages JOIN users ON messages.sender_id = users.id ORDER BY timestamp").fetchall()
#     conn.close()
#
#     return render_template('admin_dashboard.html', users=users, transactions=transactions, messages=messages)
#
#
# @app.route('/get_user/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = get_user_from_db(user_id)
#     return jsonify(user)
#
#
# @app.route('/delete_user/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     delete_user_from_db(user_id)
#     return '', 204
#
#
# def get_user_from_db(user_id):
#     conn = get_db_connection()
#     user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
#     conn.close()
#     if user:
#         return {
#             "id": user["id"],
#             "username": user["username"],
#             "email": user["email"],
#             "balance": user["balance"]
#         }
#     return {}
#
#
# def delete_user_from_db(user_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
#     conn.commit()
#     conn.close()
#
#
# @app.route("/get_transactions")
# def get_transactions():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("""
#         SELECT transactions.id, users.username as user_name, transactions.account_name, transactions.transaction_amount, transactions.transaction_time, transactions.confirmation_code
#         FROM transactions
#         JOIN users ON transactions.user_id = users.id
#     """)
#     transactions = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(transaction) for transaction in transactions])
#
#
# @app.route("/get_users")
# def get_users():
#     connection = sqlite3.connect('pbank.db')
#     connection.row_factory = sqlite3.Row
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()
#     connection.close()
#
#     return jsonify([dict(user) for user in users])
#
#
# @app.route('/edit_user', methods=['POST'])
# def edit_user():
#     user_id = request.form['id']
#     username = request.form['username']
#     email = request.form['email']
#     balance = float(request.form['balance'])
#     password = request.form['password']
#
#     conn = get_db_connection()
#     user = conn.execute('SELECT balance FROM users WHERE id = ?', (user_id,)).fetchone()
#
#     if not user:
#         flash("User not found.", "danger")
#         return redirect(url_for('admin_dashboard'))
#
#     previous_balance = user['balance']
#
#     conn.execute('UPDATE users SET username=?, email=?, balance=? WHERE id=?',
#                  (username, email, balance, user_id))
#
#     if password:
#         hashed_password = generate_password_hash(password)
#         conn.execute('UPDATE users SET password=? WHERE id=?', (hashed_password, user_id))
#
#     # Record balance change as a transaction
#     if balance != previous_balance:
#         transaction_amount = balance - previous_balance
#         conn.execute(
#             "INSERT INTO transactions (user_id, account_name, account_number, routing_number, transaction_amount, transaction_time, bank_name, confirmation_code, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             (user_id, 'WIRE DEPOSIT', '', '', transaction_amount, datetime.datetime.now(), 'Admin', '', 1)
#         )
#
#     conn.commit()
#     conn.close()
#
#     flash("User updated successfully.", "success")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/freeze_user/<int:user_id>', methods=['POST'])
# def freeze_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     conn = get_db_connection()
#     user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     new_status = 0 if user['is_frozen'] else 1
#     conn.execute("UPDATE users SET is_frozen = ? WHERE id = ?", (new_status, user_id))
#     conn.commit()
#     conn.close()
#
#     status_text = "frozen" if new_status == 1 else "unfrozen"
#     flash(f"User {user['username']} has been {status_text}.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route('/logout_user/<int:user_id>', methods=['POST'])
# def logout_user(user_id):
#     if 'username' not in session or not session.get('is_admin'):
#         return redirect(url_for('login'))
#
#     session.pop('user_id', None)
#     flash("User has been logged out.", "info")
#     return redirect(url_for('admin_dashboard'))
#
#
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         debit_card = request.form["debit_card"]
#         expiry_date = request.form["expiry_date"]
#         cvv = request.form["cvv"]
#         profile_picture = None
#
#         if 'profile_picture' in request.files:
#             file = request.files['profile_picture']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 profile_picture = filename
#             else:
#                 flash("Invalid file format! Only JPG, JPEG, or PNG allowed.", "danger")
#                 return redirect(request.url)
#
#         db = get_db_connection()
#         db.execute(
#             "UPDATE users SET debit_card = ?, profile_picture = ?, expiry_date = ?, cvv = ? WHERE id = ?",
#             (debit_card, profile_picture, expiry_date, cvv, session["user_id"]),
#         )
#         db.commit()
#         db.close()
#
#         flash("Profile updated successfully!", "success")
#         return redirect(url_for("user_dashboard"))
#
#     return render_template("register.html")
#
#
# @app.route('/admin_logout', methods=['GET'])
# def admin_logout():
#     session.pop('username', None)
#     session.pop('user_id', None)
#     session.pop('is_admin', None)
#     flash("Admin logged out successfully!", "success")
#     return redirect(url_for('login'))
#
#
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)





=======
>>>>>>> 8f39ac13d13bdb36c9f6e9767f4e9ed9b8157f99
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
<<<<<<< HEAD




=======
>>>>>>> 8f39ac13d13bdb36c9f6e9767f4e9ed9b8157f99
