create database employee_performance_system;
use employee_performance_system;

CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DepartmentID INT NOT NULL,
    ManagerID INT NULL,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Manager (
    ManagerID INT PRIMARY KEY,
    EmployeeID INT NOT NULL UNIQUE,
    DepartmentID INT NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    DepartmentID INT NOT NULL,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE EmployeeProject (
    EmployeeID INT,
    ProjectID INT,
    AssignedDate DATE,
    PRIMARY KEY (EmployeeID, ProjectID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

CREATE TABLE Skill (
    SkillID INT PRIMARY KEY,
    SkillName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Review (
    ReviewID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ManagerID INT NULL,
    ReviewDate DATE NOT NULL,
    Rating DECIMAL(3,2) NOT NULL CHECK (Rating >= 0 AND Rating <= 5),
    Comments VARCHAR(255),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ManagerID) REFERENCES Manager(ManagerID)
);

CREATE TABLE ReviewSkillScore (
    ReviewID INT,
    SkillID INT,
    Score DECIMAL(3,2) NOT NULL CHECK (Score >= 0 AND Score <= 5),
    PRIMARY KEY (ReviewID, SkillID),
    FOREIGN KEY (ReviewID) REFERENCES Review(ReviewID),
    FOREIGN KEY (SkillID) REFERENCES Skill(SkillID)
);

CREATE TABLE Goal (
    GoalID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ReviewID INT NOT NULL,
    GoalDescription VARCHAR(255) NOT NULL,
    TargetDate DATE,
    Status VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ReviewID) REFERENCES Review(ReviewID)
);

CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ReviewerID INT NOT NULL,
    ReviewID INT NOT NULL,
    FeedbackText VARCHAR(255) NOT NULL,
    FeedbackDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ReviewerID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ReviewID) REFERENCES Review(ReviewID)
);

CREATE TABLE Training (
    TrainingID INT PRIMARY KEY,
    TrainingTitle VARCHAR(100) NOT NULL,
    SkillID INT NOT NULL,
    DurationDays INT,
    FOREIGN KEY (SkillID) REFERENCES Skill(SkillID)
);

CREATE TABLE TrainingEnrollment (
    EmployeeID INT,
    TrainingID INT,
    EnrollmentDate DATE,
    Status VARCHAR(50),
    PRIMARY KEY (EmployeeID, TrainingID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (TrainingID) REFERENCES Training(TrainingID)
);

CREATE TABLE Certification (
    CertificationID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    SkillID INT NOT NULL,
    CertificationName VARCHAR(100) NOT NULL,
    IssueDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (SkillID) REFERENCES Skill(SkillID)
);

CREATE TABLE Bonus (
    BonusID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ReviewID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL CHECK (Amount >= 0),
    ApprovedBy INT NOT NULL,
    BonusDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ReviewID) REFERENCES Review(ReviewID),
    FOREIGN KEY (ApprovedBy) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Promotion (
    PromotionID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ReviewID INT NOT NULL,
    NewDesignation VARCHAR(100) NOT NULL,
    ApprovedBy INT NOT NULL,
    PromotionDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ReviewID) REFERENCES Review(ReviewID),
    FOREIGN KEY (ApprovedBy) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Recognition (
    RecognitionID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    RecognizedBy INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    RecognitionDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (RecognizedBy) REFERENCES Employee(EmployeeID)
);

INSERT INTO Department (DepartmentID, DepartmentName) VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Finance'),
(4, 'Sales');

INSERT INTO Employee (EmployeeID, Name, DepartmentID, ManagerID) VALUES
(101, 'Amit Sharma', 2, NULL),
(102, 'Priya Verma', 1, NULL),
(103, 'Rahul Patil', 2, 101),
(104, 'Sneha Kulkarni', 3, 102),
(105, 'Karan Mehta', 4, 102),
(106, 'Anjali Deshmukh', 2, 101),
(107, 'Rohit Joshi', 1, 102),
(108, 'Neha Singh', 3, 102);

INSERT INTO Manager (ManagerID, EmployeeID, DepartmentID) VALUES
(201, 101, 2),
(202, 102, 1);

INSERT INTO Project (ProjectID, ProjectName, DepartmentID) VALUES
(301, 'Performance Tracker', 2),
(302, 'Employee Training Portal', 2),
(303, 'Payroll Optimization', 3),
(304, 'Recruitment Dashboard', 1),
(305, 'Sales Analytics', 4);

INSERT INTO EmployeeProject (EmployeeID, ProjectID, AssignedDate) VALUES
(103, 301, '2025-12-01'),
(103, 302, '2025-12-05'),
(104, 303, '2025-12-03'),
(105, 305, '2025-12-04'),
(106, 301, '2025-12-06'),
(107, 304, '2025-12-07'),
(108, 303, '2025-12-08');

INSERT INTO Skill (SkillID, SkillName) VALUES
(401, 'Java'),
(402, 'SQL'),
(403, 'Communication'),
(404, 'Leadership'),
(405, 'Data Analysis');

INSERT INTO Review (ReviewID, EmployeeID, ManagerID, ReviewDate, Rating, Comments) VALUES
(501, 103, 201, '2026-01-10', 4.20, 'Consistent performer with good technical skills'),
(502, 104, 202, '2026-01-12', 3.80, 'Needs improvement in meeting deadlines'),
(503, 105, 202, '2026-01-15', 4.50, 'Excellent sales contribution'),
(504, 106, 201, '2026-01-18', 4.70, 'Outstanding performance and leadership potential'),
(505, 107, 202, '2026-01-20', 3.90, 'Good communication and HR coordination'),
(506, 108, 202, '2026-01-22', 4.10, 'Strong financial analysis skills');

INSERT INTO ReviewSkillScore (ReviewID, SkillID, Score) VALUES
(501, 401, 4.50),
(501, 402, 4.20),
(502, 403, 3.80),
(503, 403, 4.60),
(503, 405, 4.40),
(504, 401, 4.80),
(504, 404, 4.70),
(505, 403, 4.00),
(506, 405, 4.20);

INSERT INTO Goal (GoalID, EmployeeID, ReviewID, GoalDescription, TargetDate, Status) VALUES
(601, 103, 501, 'Improve backend API performance', '2026-04-30', 'In Progress'),
(602, 104, 502, 'Complete finance reporting automation', '2026-05-15', 'Pending'),
(603, 105, 503, 'Increase quarterly sales by 10%', '2026-06-30', 'In Progress'),
(604, 106, 504, 'Lead new employee evaluation module', '2026-04-15', 'Completed'),
(605, 107, 505, 'Improve employee onboarding workflow', '2026-05-20', 'In Progress');

INSERT INTO Feedback (FeedbackID, EmployeeID, ReviewerID, ReviewID, FeedbackText, FeedbackDate) VALUES
(701, 103, 101, 501, 'Rahul shows strong improvement in coding standards', '2026-01-11'),
(702, 104, 102, 502, 'Sneha should focus more on timely submission', '2026-01-13'),
(703, 105, 102, 503, 'Karan handled client communication excellently', '2026-01-16'),
(704, 106, 101, 504, 'Anjali has shown excellent ownership of tasks', '2026-01-19'),
(705, 107, 102, 505, 'Rohit maintains good coordination with employees', '2026-01-21');

INSERT INTO Training (TrainingID, TrainingTitle, SkillID, DurationDays) VALUES
(801, 'Advanced Java Bootcamp', 401, 10),
(802, 'SQL Performance Tuning', 402, 7),
(803, 'Professional Communication', 403, 5),
(804, 'Leadership Essentials', 404, 6),
(805, 'Data Analytics Fundamentals', 405, 8);

INSERT INTO TrainingEnrollment (EmployeeID, TrainingID, EnrollmentDate, Status) VALUES
(103, 801, '2026-02-01', 'Completed'),
(103, 802, '2026-02-10', 'In Progress'),
(104, 805, '2026-02-05', 'Completed'),
(105, 803, '2026-02-08', 'Completed'),
(106, 804, '2026-02-12', 'In Progress'),
(107, 803, '2026-02-15', 'Completed'),
(108, 805, '2026-02-18', 'Completed');

INSERT INTO Certification (CertificationID, EmployeeID, SkillID, CertificationName, IssueDate) VALUES
(901, 103, 401, 'Oracle Java Associate', '2026-02-20'),
(902, 104, 405, 'Data Analytics Foundation', '2026-02-25'),
(903, 105, 403, 'Business Communication Pro', '2026-02-28'),
(904, 107, 403, 'HR Communication Excellence', '2026-03-01'),
(905, 108, 405, 'Financial Data Analysis', '2026-03-03');

INSERT INTO Bonus (BonusID, EmployeeID, ReviewID, Amount, ApprovedBy, BonusDate) VALUES
(1001, 103, 501, 15000.00, 101, '2026-01-25'),
(1002, 105, 503, 20000.00, 102, '2026-01-27'),
(1003, 106, 504, 25000.00, 101, '2026-01-30');

INSERT INTO Promotion (PromotionID, EmployeeID, ReviewID, NewDesignation, ApprovedBy, PromotionDate) VALUES
(1101, 106, 504, 'Senior Software Engineer', 101, '2026-02-01'),
(1102, 105, 503, 'Sales Team Lead', 102, '2026-02-05');

INSERT INTO Recognition (RecognitionID, EmployeeID, RecognizedBy, Title, RecognitionDate) VALUES
(1201, 103, 101, 'Best Backend Contributor', '2026-02-10'),
(1202, 105, 102, 'Top Sales Performer', '2026-02-12'),
(1203, 106, 101, 'Star Employee of the Quarter', '2026-02-15'),
(1204, 107, 102, 'Excellent HR Coordinator', '2026-02-18');

select * from Bonus;

select * from Employee;	

use employee_performance_system;
select * from ReviewSkillScore;

