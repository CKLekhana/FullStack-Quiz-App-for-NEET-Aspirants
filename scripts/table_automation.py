import pymysql
import bcrypt
import random
import string
import pandas as pd
from datetime import datetime, timedelta

# MySQL Connection
conn = pymysql.connect(
    host="localhost", user="root", password="lekhu$kitty$@25", database="neetquizdb"
)
cursor = conn.cursor()

# 📌 Utility Functions
def random_string(length=8):
    return ''.join(random.choices(string.ascii_letters, k=length))

def generate_email(name):
    return name.lower().replace(" ", "") + "@example.com"

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(10)).decode()

# 📌 Fetch Existing Subject and Chapter IDs
cursor.execute("SELECT subject_id FROM subjects")
subject_ids = [row[0] for row in cursor.fetchall()]

cursor.execute("SELECT chapter_id, subject_id FROM chapters")
chapters = cursor.fetchall()
chapter_dict = {}
for chap_id, subj_id in chapters:
    if subj_id not in chapter_dict:
        chapter_dict[subj_id] = []
    chapter_dict[subj_id].append(chap_id)

# 📌 Step 1: Insert Users with Hashed Passwords
users = []
for i in range(1, 61):  # Creating 60 users
    name = f"User{i}"
    email = generate_email(name)
    password = hash_password("password123")  # Default password
    cursor.execute("INSERT INTO users_auth (user_name, user_email, hashed_password) VALUES (%s, %s, %s)", 
                   (name, email, password))
    users.append((cursor.lastrowid, name))  # Store user_id for later

# 📌 Step 2: Insert User Stats
for user_id, _ in users:
    total_points = random.randint(100, 1000)  # Random points
    highest_rank = random.randint(1,50)  # Initially, no highest rank
    
    cursor.execute(
        "INSERT INTO user_stats (user_id, total_points, current_rank, highest_rank) VALUES (%s, %s, %s, %s)",
        (user_id, total_points, None, highest_rank)
    )

# 📌 Step 3: Insert High Scores
for user_id, _ in users:
    for subject_id in subject_ids:
        score = random.randint(200, 1000)
        cursor.execute("INSERT INTO high_scores (user_id, subject_id, scores) VALUES (%s, %s, %s)", 
                       (user_id, subject_id, score))

conn.commit()
print("✅ Step 2: User Stats Populated (Without Current Rank)")

# ✅ Step 3: Fetch Users Ordered by Total Points
cursor.execute("SELECT user_id, total_points FROM user_stats ORDER BY total_points DESC")
ranked_users = cursor.fetchall()

# ✅ Step 4: Assign `current_rank` and Update `highest_rank`
for rank, (user_id, total_points) in enumerate(ranked_users, start=1):
    # Get the previous highest rank
    cursor.execute("SELECT highest_rank FROM user_stats WHERE user_id = %s", (user_id,))
    prev_highest_rank = cursor.fetchone()[0]
    
    # Determine new highest rank
    new_highest_rank = min(prev_highest_rank, rank) if prev_highest_rank else rank

    # Update `current_rank` and `highest_rank`
    cursor.execute(
        "UPDATE user_stats SET current_rank = %s, highest_rank = %s WHERE user_id = %s",
        (rank, new_highest_rank, user_id)
    )

# 📌 Step 4: Insert User Activity Log
for user_id, _ in users:
    subject_id = random.choice(subject_ids)  # Select random subject
    chapter_id = random.choice(chapter_dict[subject_id])  # Get random chapter from subject
    attempt_date = datetime.now() - timedelta(days=random.randint(1, 30))  # Random past date
    score = random.randint(0, 100)

    cursor.execute("INSERT INTO user_activity_log (user_id, subject_id, chapter_id, score, attempt_date) VALUES (%s, %s, %s, %s, %s)", 
                   (user_id, subject_id, chapter_id, score, attempt_date))

# 📌 Commit & Close
conn.commit()
cursor.close()
conn.close()

print("🚀 Database populated successfully with users, stats, scores, and activity logs!")
