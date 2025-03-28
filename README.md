# A Full Stack Responsive QUIZ APP for NEET aspirants

## Introduction
The Full-Stack Quiz App is an interactive platform where users can register, log in, and take quizzes on various subjects. The app provides a dashboard for tracking progress, a profile section for user details, and a discover section to explore available quizzes.

The backend handles user authentication, and data persistence, while the frontend provides a smooth and responsive user experience using React and Bootstrap.

## Tech Stack

### Frontend
1. **React.js** – For building the UI.
2. **React Bootstrap** – For styling and UI components.

### Backend
1. **Node.js & Express.js** - For handling API requests.
2. **MySQL** - For storing user and quiz data
3. **Python** - For automatic database population

### Authentication
1. **JWT** - For securing user sessions.
2. **LocalStorage** - To store authentication tokens client-side
3. **Bcrypt** - To hash and compare passwords.

## Folder Structure

## Features
1. ### User Authentication
- sign up and login functionality
- JWT-based authentication

2. ### Dashboard
- Displays user progress in various quizzes.
- Shows Completion percentage using progress bars.

3. ### Profile Section
- Displays user details and gives editing options.

4. ### Discover Section
- Displays All the quizzes available to attend.

5. ### Database Automation
- Python scripts to automatically poputlate database tables.

## Setup Instructions

1.  Clone the Repository

git clone https://github.com/yourusername/NQ-APP.git
cd NQ-APP

2. Backend Setup

cd backend
npm install
node index.js  # Starts the Express server

3. Frontend Setup

cd ../frontend
npm install
npm start  # Runs the React frontend

4. Database Setup

Ensure MySQL is installed and running.
Create a database and update backend/db/config.js with credentials.

Run Python script to populate tables:

cd ../scripts
python populate_db.py

## API Endpoints

1. Auth Routes

POST /api/auth/register – User registration.
POST /api/auth/login – User login.

2. App Routes
GET /api/discover – Fetch available quizzes.
GET /api/dashboard – Fetch user progress.
GET /api/profile - Fetch user details. 

📌 Future Enhancements

Timed quizzes with countdown timers.

Real-time multiplayer quizzes with WebSockets.

Dark mode toggle for better UX.

📜 License

This project is open-source and available under the MIT License.

Happy coding! 🚀

