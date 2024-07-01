Task Manager
This project is a full-stack task management application that allows users to sign up, log in, create tasks, update tasks, and delete tasks. The backend is built with Node.js, Express, and MongoDB, and the frontend is built using HTML, CSS, and JavaScript. JWT is used for authentication and authorization.

Features
User Registration and Login
JWT-based Authentication
Task Creation, Update, and Deletion
Secure Password Handling
Cookie-based Session Management
Token-based Authorization
Technologies Used
Backend
Node.js
Express.js
MongoDB (Atlas)
Mongoose
JWT (jsonwebtoken)
bcrypt.js
Cookie-parser
Frontend
HTML
CSS
JavaScript
Installation
Prerequisites
Node.js
MongoDB Atlas account or local MongoDB server
Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/task-manager.git
cd task-manager/BACKEND
Install the dependencies:
bash
Copy code
npm install
Create a .env file in the BACKEND directory and add the following environment variables:
makefile
Copy code
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
Start the backend server:
bash
Copy code
npm start
Frontend Setup
Navigate to the FRONTEND directory:
bash
Copy code
cd ../FRONTEND
Open index.html in your browser using Live Server or any other method.
Usage
Open the application in your browser.
Sign up for a new account.
Log in with your credentials.
Create, update, and delete tasks as needed.
API Endpoints
User Routes
POST /api/v1/users/register - Register a new user
POST /api/v1/users/login - Log in a user
POST /api/v1/users/logout - Log out a user
POST /api/v1/users/update-account - Update user account
Task Routes
GET /api/v1/tasks - Get all tasks
POST /api/v1/tasks - Create a new task
PUT /api/v1/tasks/:id - Update a task
DELETE /api/v1/tasks/:id - Delete a task
Project Structure
java
Copy code
task-manager/
├── BACKEND/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
└── FRONTEND/
    ├── css/
    │   ├── style.css
    ├── js/
    │   ├── index.js
    ├── images/
    │   ├── Space wallpaper dump.jpeg
    ├── index.html
    ├── login.html
    ├── signup.html
    └── dashboard.html
Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss changes.
