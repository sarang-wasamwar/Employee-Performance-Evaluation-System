const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

/* =========================================
   ROOT TEST ROUTE
========================================= */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..frontend','login.html'));
});

/* =========================================
   EMPLOYEE ROUTES
========================================= */

// GET all employees with department
app.get('/employees', (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeID,
      e.Name,
      d.DepartmentName
    FROM Employee e
    LEFT JOIN Department d ON e.DepartmentID = d.DepartmentID
    ORDER BY e.EmployeeID;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching employees:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// POST add employee
app.post('/employees', (req, res) => {
  const { EmployeeID, Name, DepartmentID, ManagerID } = req.body;

  const sql = `
    INSERT INTO Employee (EmployeeID, Name, DepartmentID, ManagerID)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [EmployeeID, Name, DepartmentID, ManagerID || null], (err, result) => {
    if (err) {
      console.error('Error adding employee:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Employee added successfully' });
  });
});

/* =========================================
   REVIEW ROUTES
========================================= */

// GET all reviews
app.get('/reviews', (req, res) => {
  const sql = `
    SELECT 
      r.ReviewID,
      e.Name AS EmployeeName,
      r.Rating,
      r.ReviewDate
    FROM Review r
    JOIN Employee e ON r.EmployeeID = e.EmployeeID
    ORDER BY r.ReviewID DESC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// POST add review
app.post('/reviews', (req, res) => {
  const { ReviewID, EmployeeID, ManagerID, Rating, ReviewDate } = req.body;

  const sql = `
    INSERT INTO Review (ReviewID, EmployeeID, ManagerID, Rating, ReviewDate)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [ReviewID, EmployeeID, ManagerID || null, Rating, ReviewDate], (err, result) => {
    if (err) {
      console.error('Error adding review:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Review added successfully' });
  });
});

/* =========================================
   PERFORMANCE REPORT ROUTE
========================================= */

// GET employee performance report
app.get('/performance-report', (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeID,
      e.Name,
      d.DepartmentName,
      AVG(r.Rating) AS AverageRating,
      COUNT(r.ReviewID) AS TotalReviews
    FROM Employee e
    LEFT JOIN Department d ON e.DepartmentID = d.DepartmentID
    LEFT JOIN Review r ON e.EmployeeID = r.EmployeeID
    GROUP BY e.EmployeeID, e.Name, d.DepartmentName
    ORDER BY AverageRating DESC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching performance report:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

/* =========================================
   DEVELOPMENT DATA ROUTE
   Covers:
   Training, TrainingEnrollment, Certification, Skill
========================================= */

app.get('/development-data', (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeID,
      e.Name AS EmployeeName,
      t.TrainingTitle,
      s.SkillName,
      CASE 
        WHEN c.CertificationID IS NOT NULL THEN 'Certified'
        ELSE 'Not Certified'
      END AS CertificationStatus
    FROM Employee e
    LEFT JOIN TrainingEnrollment te ON e.EmployeeID = te.EmployeeID
    LEFT JOIN Training t ON te.TrainingID = t.TrainingID
    LEFT JOIN Skill s ON t.SkillID = s.SkillID
    LEFT JOIN Certification c 
      ON e.EmployeeID = c.EmployeeID 
      AND s.SkillID = c.SkillID
    ORDER BY e.EmployeeID;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching development data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

/* =========================================
   REWARDS DATA ROUTE
   Covers:
   Bonus, Promotion, Recognition
========================================= */

app.get('/rewards-data', (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeID,
      e.Name AS EmployeeName,
      COALESCE(CONCAT('₹', b.Amount), 'N/A') AS BonusAmount,
      CASE 
        WHEN p.PromotionID IS NOT NULL THEN 'Yes'
        ELSE 'No'
      END AS PromotionStatus,
      COALESCE(rec.Title, 'N/A') AS RecognitionTitle
    FROM Employee e
    LEFT JOIN Bonus b ON e.EmployeeID = b.EmployeeID
    LEFT JOIN Promotion p ON e.EmployeeID = p.EmployeeID
    LEFT JOIN Recognition rec ON e.EmployeeID = rec.EmployeeID
    ORDER BY e.EmployeeID;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching rewards data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

/* =========================================
   START SERVER
========================================= */
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});