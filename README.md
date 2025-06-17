🧠 Workflo – Role-Based Task Management System

**Workflo** is a full-stack MERN application designed to streamline task assignment and tracking within an organization. Built with role-based access control, file upload functionality, and real-time task status updates, Workflo empowers Admins and Employees to collaborate efficiently and stay organized.

🌐 Live Demo & Repository

🔗 Live: [workflo-27.onrender.com](https://workflo-27.onrender.com)  
📦 GitHub: [github.com/Vin-2709/Workflo](https://github.com/Vin-2709/Workflo)

🔍 Overview

📌 Features

👤 **Role-Based Authentication**

- **Admin**
  - Register / Login
  - Create and assign tasks to employees
  - Upload files related to task details
  - View all employee tasks
  - Change task status (Pending, Accepted, Rejected, Completed)
  - Edit and delete tasks

- **Employee**
  - Register / Login
  - View assigned tasks
  - Accept or reject tasks
  - Upload task completion files
  - Track task status updates

📁 **File Upload Support**

- Uses **Multer** middleware to handle file uploads
- Integrated with **Cloudinary** for cloud-based file storage
- Admins can upload task instructions; Employees can upload completed work

📊 **Task Status Lifecycle**

- Admin creates task → Status: `Pending`
- Employee accepts/rejects → Status: `Accepted` / `Rejected`
- Admin reviews submission → Status: `Completed`

🧪 Testing Instructions

**Demo Credentials:**

- Admin  
  `admin@example.com` / `admin123`
  
- Employee  
  `employee@example.com` / `employee123`

You can also register new Admin or Employee accounts.

Test the following:
- Assign tasks with file uploads as Admin
- Accept/Reject tasks and upload work as Employee
- Verify task status changes across dashboards
- Check uploaded files on your Cloudinary account

📷 Screenshots

> *(Click to view each screenshot)*

- [Landing Page](https://github.com/user-attachments/assets/c288a823-089e-470d-96b0-615f436b92cf)
- [Login Page](https://github.com/user-attachments/assets/0e90e9ee-edfb-488a-9c4c-2127e2e8c61e)
- [Create Account Page](https://github.com/user-attachments/assets/0a144ea7-6690-4ec4-bb6f-d278bfa95d63)
- [Employee Dashboard](https://github.com/user-attachments/assets/77ade77b-14ed-4ba3-904c-321719298008)
- [File Upload (Employee Submission)](https://github.com/user-attachments/assets/2dd3fe02-21d1-4061-848a-d7c0c5e6062a)
- [Admin Dashboard - Overview](https://github.com/user-attachments/assets/73a5799d-6be8-4756-baed-622671f9f158)
- [Admin Dashboard - Task View](https://github.com/user-attachments/assets/7a082588-6664-47a9-91d9-3102579b4d55)
- [Task Assignment Modal](https://github.com/user-attachments/assets/682c8619-3998-431a-a6ec-0ea57ad301f9)

👨‍💻 Author

Developed by [Vineet](https://github.com/Vin-2709)











 
