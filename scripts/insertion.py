import pandas as pd
import mysql.connector

# MySQL Connection
conn = mysql.connector.connect(
    host="localhost", user="root", password="lekhu$kitty$@25", database="neetquizdb"
)
cursor = conn.cursor()

# Function to insert data into any table
def insert_data(file_path, table_name, columns):
    df = pd.read_excel(file_path)  # Read Excel file
    placeholders = ', '.join(['%s'] * len(columns))  # Generate placeholders
    query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({placeholders})"

    for _, row in df.iterrows():
        cursor.execute(query, tuple(row[col] for col in columns))  # Insert row

    conn.commit()  # Save changes
    print(f"Data inserted into {table_name} successfully!")

# Define tables and their corresponding Excel files & columns
tables_info = {
    "chapters": ("chapters.xlsx", ["chapter_id", "chapter_name", "subject_id"]),
}

# Loop through each table and insert data
for table, (file, columns) in tables_info.items():
    insert_data(file, table, columns)

# Close connection
cursor.close()
conn.close()