# Employee Performance Evaluation System

## 📌 Overview

The **Employee Performance Evaluation System** is a full-stack web application designed to manage employee performance, reviews, training, promotions, and rewards within an organization.

This system enables:

* Managers to evaluate employees
* Employees to receive and give feedback
* Organizations to track growth, skills, and performance metrics

---

## 🚀 Features

* Employee & Manager Management
* Performance Reviews with Ratings
* Skill-based Evaluation System
* Peer-to-Peer Feedback
* Project Assignment Tracking
* Training & Certification Tracking
* Bonus & Promotion Management
* Recognition System

---

## 🏗️ Project Structure

```
Employee_performance_evaluation/
│
├── frontend/
│   ├── dashboard.html
│   ├── development.html
│   ├── employees.html
│   ├── index.html
│   ├── report.html
│   ├── reviews.html
│   ├── script.js
│   └── style.css
│
├── node_modules/
│
├── db.js
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js (Express.js)
* **Database:** MySQL

---

## 🧩 Database Design

The system includes the following core entities:

### 🔹 Organizational Structure

* Department
* Employee
* Manager

### 🔹 Work & Skills

* Project
* EmployeeProject
* Skill

### 🔹 Performance Evaluation

* Review
* ReviewSkillScore
* Goal
* Feedback

### 🔹 Growth & Development

* Training
* TrainingEnrollment
* Certification

### 🔹 Rewards & Recognition

* Bonus
* Promotion
* Recognition

---

## 🔄 System Workflow

1. Employees are assigned to departments and managers
2. Employees are assigned projects and skills
3. Managers conduct performance reviews
4. Reviews include ratings, comments, and skill scores
5. Goals are assigned based on reviews
6. Feedback is collected from peers and managers
7. Employees undergo training and earn certifications
8. Based on performance:

   * Bonuses are awarded
   * Promotions are granted
   * Recognition is given

---

## 🔮 Future Scope

* 👥 **Dual Dashboards**

  * Employee Dashboard (view performance, feedback)
  * Manager Dashboard (assign reviews, manage employees)

* 💬 **Peer Review System**

  * Employees can review each other

* 💰 **Bonus Management System**

  * Manager can decide bonuses based on performance
  * Integration with **transaction gateway** for direct bonus transfer from company account

* 🔐 **Authentication & Role Management**

  * Secure login system for employees and managers

* ☁️ **Deployment**

  * Deploy on cloud platforms (AWS, Vercel, or Heroku)

* 📊 **Advanced Analytics**

  * Performance graphs and AI-based insights

---


### 💬 Advanced Feedback System

* Peer-to-peer anonymous feedback
* 360-degree evaluation system

---

### 💰 Bonus & Payment Integration

* Integration with **payment gateway**
* Manager can approve bonuses directly from company account
* Automated bonus calculation based on performance scores

---

### 📊 Analytics & AI Integration

* Performance trend graphs
* AI-based employee performance prediction
* Smart recommendations for training and promotions

---

### 🔐 Authentication & Security

* Role-based login (Admin / Manager / Employee)
* JWT Authentication
* Secure password storage

---

### ☁️ Deployment

* Deploy backend on cloud (AWS / Render / Railway)
* Deploy frontend on Vercel / Netlify
* Use cloud database (AWS RDS / PlanetScale)

---

## 🛠️ How to Run Database in MySQL Workbench

### Step 1: Open MySQL Workbench

* Open Workbench and connect to your local server

### Step 2: Open SQL Editor

* Click **New SQL Tab**

### Step 3: Paste Full SQL Script

* Copy your entire SQL code and paste it

### Step 4: Execute Script

* Click ⚡ (Execute button)

### Step 5: Verify Database

Run:

```sql
SHOW DATABASES;
USE employee_performance_system;
SHOW TABLES;
```

---

## 🔌 How to Connect Database to Project

### 1. Install Dependency

```bash
npm install mysql2
```

---

### 2. Setup `db.js`

```js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'employee_performance_system'
});

db.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Database Connected");
    }
});

module.exports = db;
```

---

### 3. Setup `server.js`

```js
const express = require('express');
const db = require('./db');

const app = express();

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM Employee', (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

---

### 4. Run Server

```bash
node server.js
```

Open:

```
http://localhost:3000/employees
```

---

## ⚠️ Common Issues

* ❌ Database not found → check name
* ❌ Access denied → check password
* ❌ Tables missing → re-run SQL script

---

## 💡 Future Enhancements Ideas

* Real-time notifications
* Mobile app integration
* Attendance + performance linking
* Company-wide leaderboard

---

## 👨‍💻 Contributors

* **Sarang Wasamwar**
  Computer Engineering Student

* **Ayush Thakare**
Computer Engineering Student
[GitHub: https://github.com/Ayu5h-2005]

---

## 📄 License

This project is for educational purposes and can be extended for real-world applications.
