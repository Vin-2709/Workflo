# 🧠 Workflo – AI-Powered Task Management System
Workflo is a full-stack MERN application designed to streamline task assignment, tracking, and collaboration within an organization. It features role-based access control (Admin vs. Employee), cloud-based file management via Cloudinary, and an integrated Google Gemini AI assistant to analyze task context and provide intelligent feedback.

🔗 Live Demo: workflo-27.onrender.com

📦 GitHub Repo: github.com/Vin-2709/Workflo

 ## 📌 Key Features
 
👤 Role-Based Authentication

Admin Role: Can register, log in, create new tasks, assign tasks to employees, edit/delete tasks, and update task status (e.g., Completed, Failed).

Employee Role: Can register, log in, view all assigned tasks, update task status (e.g., "Complete"), and submit work.

## 📁 Cloud File Management

Uses Multer for file handling and Cloudinary for cloud storage.

Admins can attach files (instructions, templates) when creating tasks.

Employees can upload their completed work files for admin review.

## 💬 Task Commenting System

Admins and employees can leave comments on tasks for clear communication, questions, and feedback.

## ✨ AI Assistant (Google Gemini)

Integrated AI can be queried by both Admins and Employees.

Analyzes task descriptions, admin-provided files, and employee submissions.

Answers contextual questions like, "Does my submission match the task requirements?" or "What improvements can I make?"

## 📊 Real-Time Dashboards

Both roles have a dedicated dashboard.

Displays task statistics (Active, Completed, Failed).

Admins see a table of all assigned tasks; Employees see a card view of their personal tasks.

## 📸 Screenshots & Functionality

### Home & Auth

* Landing Page

<img width="1849" height="1014" alt="Screenshot 2025-11-01 230833" src="https://github.com/user-attachments/assets/224e6e7a-f8b5-422b-bed2-b41fe2c9e7d0" />

<img width="1864" height="1025" alt="Screenshot 2025-11-01 230850" src="https://github.com/user-attachments/assets/cf01d88a-2cee-46c3-a804-d47e6f1fb52c" />

<img width="1872" height="925" alt="Screenshot 2025-11-01 231020" src="https://github.com/user-attachments/assets/9b4eedc7-315f-49ca-ad6e-fbe07a77e99a" />



#### Login & Register

<img width="1884" height="1026" alt="image" src="https://github.com/user-attachments/assets/5a9ca1e5-ce2e-426e-86a2-44b16158cf89" />

<img width="1861" height="1008" alt="image" src="https://github.com/user-attachments/assets/b052dd8f-f0d3-4dea-860f-73e140b8096c" />



### Admin Features

#### Admin Dashboard (Overview & Task List)

<img width="1870" height="1020" alt="Screenshot 2025-11-01 231255" src="https://github.com/user-attachments/assets/e83888b0-fb83-42c3-a393-72fbc47d3223" />

<img width="1864" height="1026" alt="image" src="https://github.com/user-attachments/assets/8c791721-20a7-470f-82e6-abc435cddd64" />



#### Assign Task Modal

<img width="1857" height="1008" alt="image" src="https://github.com/user-attachments/assets/f23c413d-885a-4993-9132-a286082a2706" />


#### Edit Task Modal

<img width="1851" height="1021" alt="image" src="https://github.com/user-attachments/assets/e8567272-7169-42c3-bf76-6981cebad6fb" />


#### Admin Manage Files & Comments

<img width="1231" height="1025" alt="image" src="https://github.com/user-attachments/assets/6700cb56-dcc6-4e68-b8bb-92ebd7261c33" />


#### Admin AI Assistant

<img width="1078" height="989" alt="image" src="https://github.com/user-attachments/assets/9b79f50a-4704-4049-bddf-fcfaba7cedfd" />

<img width="1225" height="996" alt="image" src="https://github.com/user-attachments/assets/7c7e5242-42d9-4eff-9010-471a07547216" />



### Employee Features

#### Employee Dashboard (Task Cards)

<img width="1865" height="1013" alt="image" src="https://github.com/user-attachments/assets/f59dda6d-cb0d-4042-9a22-dbbcce460d30" />


#### Employee Manage Files & Comments

<img width="1214" height="1017" alt="image" src="https://github.com/user-attachments/assets/050419bd-2532-4722-94b3-81747953fb64" />


#### Employee AI Assistant

<img width="909" height="938" alt="image" src="https://github.com/user-attachments/assets/9effffdd-89b2-4a77-9da0-b80899064e05" />

<img width="986" height="1007" alt="image" src="https://github.com/user-attachments/assets/880b1360-a36d-4f81-89cd-c3fdf619abb8" />



## 🛠️ Tech Stack

### 🖥️ Frontend:

React.js (with Vite)

React Router

Tailwind CSS

Axios

Lucide React (icons)

### ⚙️ Backend:

Node.js

Express.js

### 💾 Database:

MongoDB (with Mongoose)

### 🔐 Authentication:

JSON Web Tokens (JWT)

bcrypt.js (for password hashing)

cookie-parser

### ☁️ File Storage & AI:

Cloudinary: For cloud-based file hosting.

Multer: For handling multipart/form-data file uploads.

Google Generative AI (Gemini): For the AI assistant feature.

## 🚀 How to Set Up & Run
1. Clone the repository
Bash

git clone https://github.com/Vin-2709/Workflo.git
cd Workflo
2. Backend Setup
Bash

### Navigate to the backend folder
cd Backend

### Install dependencies
npm install

### Create a .env file in the /Backend folder and add the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173

### Cloudinary keys
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### Google Gemini key
GOOGLE_GEMINI_KEY=your_gemini_api_key

### Start the backend server
npm run dev
3. Frontend Setup
Bash

### Navigate to the frontend folder (from the root)
cd Frontend

### Install dependencies
npm install

### Create a .env file in the /Frontend folder
VITE_BACKEND_URL=http://localhost:5000

### Start the frontend development server
npm run dev
4. Navigate
Open your browser and go to http://localhost:5173 to use the application.

## 🧪 Demo Credentials
You can register new Admin or Employee accounts, or use these demo accounts:

Admin

Email: admin@example.com

Password: admin123

Employee

Email: employee@example.com

Password: employee123

## 📁 Folder Structure
Workflo/
├── Backend/
│   ├── src/
│   │   ├── controllers/  # (auth, admin, employee, task, ai, upload, comment)
│   │   ├── middlewares/  # (auth.middleware.js, multer.js)
│   │   ├── models/       # (admin.js, employee.js, task.js)
│   │   ├── routes/       # (all API routes)
│   │   ├── services/     # (ai.service.js)
│   │   ├── utils/        # (db.js, cloudinary.js, filedownloader.js)
│   │   ├── app.js        # (Express app config)
│   │   └── index.js      # (Server entry point)
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/         # (Login.jsx, Register.jsx)
│   │   │   ├── dashboard/    # (AdminDashboard.jsx, EmployeeDashboard.jsx)
│   │   │   ├── layout/       # (Dashboard.jsx)
│   │   │   ├── Modal/        # (AdminModal, EmployeeModal, AiModals...)
│   │   │   └── ui/           # (Header.jsx, TaskCard.jsx, StatusCards.jsx)
│   │   ├── pages/        # (Home.jsx)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
## 👨‍💻 Author
Developed by Vineet
