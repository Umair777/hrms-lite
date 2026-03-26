# 🧑‍💼 HRMS Lite – Full Stack Application

A lightweight Human Resource Management System (HRMS Lite) built to manage employees and track daily attendance.

This project demonstrates **end-to-end full-stack development**, including frontend UI, backend APIs, database integration, validation, and deployment readiness.

---
## 🚀 Usage
### 1. Start Backend (Render)

Before using the app, wake up the backend (may take a few seconds if idle):

https://hrms-lite-jo2k.onrender.com/

### 2. Open Frontend (Vercel)

Access the user interface here:

https://hrms-lite-frontend-delta.vercel.app/

## Features

### 👨‍💼 Employee Management

* Add new employees (ID, Name, Email, Department)
* View all employees
* Delete employees
* Prevent duplicate employee IDs
* Server-side validation (required fields, email format)

---

### 📅 Attendance Management

* Mark attendance (Present / Absent)
* Automatically initializes attendance for all employees daily
* View today's attendance in a dashboard
* Update attendance in real-time
* Fetch past attendance records
* Filter attendance history by selected employees

---

### 📊 UI & UX Features

* Clean and responsive layout using Tailwind CSS
* Toggle-based record selection UI
* Dynamic tables with conditional rendering
* Status highlighting (Present = Green, Absent = Red)
* Empty states and error handling

---

## 🧱 Tech Stack

### Frontend

* React (Functional Components + Hooks)
* Tailwind CSS
* Fetch API

### Backend

* FastAPI (Python)
* Pydantic (validation)
* Supabase (PostgreSQL)

### Deployment (Recommended)

* Frontend: Vercel / Netlify
* Backend: Render
* Database: Supabase

---

## 🗂️ Project Structure

```
hrms-lite/
│
├── hrms-frontend/
│   ├── components/
│   │   ├── EmployeeForm.jsx
│   │   ├── EmployeeList.jsx
│   │   ├── Attendance.jsx
│   │   └── Navbar.jsx
│   └── App.jsx
│
├── hrms-backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── schemas.py
│   │   ├── routes/
│   │   │   ├── employee.py
│   │   │   └── attendance.py
│   │   └── services/
│   │       ├── employee_service.py
│   │       └── attendance_service.py
```

---

## ⚙️ Backend Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### 2. Install Dependencies

```bash
pip install fastapi uvicorn supabase python-dotenv pydantic[email]
```

### 3. Create `.env`

```
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
```

### 4. Run Server

```bash
uvicorn app.main:app --reload
```

---

## 💻 Frontend Setup

```bash
cd hrms-frontend
npm install
npm start
```

---

## 🗄️ Database Schema

### Employees Table

```sql
CREATE TABLE employees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employee_id TEXT UNIQUE,
    name TEXT,
    email TEXT,
    department TEXT
);
```

---

### Attendance Table

```sql
CREATE TABLE attendance (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employee_id BIGINT REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT CHECK (status IN ('Present', 'Absent')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔗 API Endpoints

### Employee APIs

* `POST /employees` → Add employee
* `GET /employees` → Get all employees
* `DELETE /employees/{id}` → Delete employee

---

### Attendance APIs

* `POST /attendance` → Mark attendance
* `GET /attendance/today` → Get today's attendance
* `GET /attendance` → Get all attendance records

---

## 🧠 Key Design Decisions

* **Normalized database design** (no duplication of employee data in attendance)
* **Lazy initialization of attendance**

  * Attendance records are created only when needed
* **Service layer architecture**

  * Separation of concerns (routes vs business logic)
* **Frontend data merging**

  * Employee + Attendance combined in UI

---

## ⚠️ Assumptions & Limitations

* Single admin user (no authentication)
* No pagination (small dataset assumption)
* Attendance is tracked daily (no shifts/timing)
* No editing employee details (only add/delete)

---

## ⭐ Bonus Features Implemented

* Fetch attendance history for selected employees
* Dynamic UI with checkbox-based filtering
* Real-time updates after marking attendance

---

## 🚀 Future Improvements

* Dashboard summary (total present/absent)
* Date-wise filtering
* Authentication (Admin login)
* Pagination for large datasets
* Export attendance reports

---

## 📌 Submission Links

* 🌐 Live Frontend: (Add your Vercel/Netlify link)
* ⚙️ Backend API: (Add your Render link)
* 📂 GitHub Repo: (Add repo link)

---

## 👨‍💻 Author

Developed as part of a full-stack evaluation assignment.

---
