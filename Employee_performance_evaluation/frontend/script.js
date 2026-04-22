const API_BASE = 'http://localhost:3000';

/* =========================
   LOGIN LOGIC
========================= */
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Demo login credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'HR/Admin');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid username or password. Use admin / admin123');
    }
  });
}

/* =========================
   PROTECT PAGES (except login)
========================= */
const currentPage = window.location.pathname.split('/').pop();

if (currentPage !== 'index.html' && currentPage !== '') {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    window.location.href = 'index.html';
  }
}

/* =========================
   LOGOUT HANDLER
========================= */
document.addEventListener('DOMContentLoaded', function () {
  const logoutLinks = document.querySelectorAll('a[href="index.html"]');

  logoutLinks.forEach(link => {
    link.addEventListener('click', function () {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
    });
  });
});

/* =========================
   EMPLOYEES MODULE
========================= */

// Load all employees
async function loadEmployees() {
  try {
    const res = await fetch(`${API_BASE}/employees`);
    const data = await res.json();

    const tableBody = document.getElementById('employeeTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="3" class="empty-message">No employee records found.</td>
        </tr>
      `;
      return;
    }

    data.forEach(emp => {
      tableBody.innerHTML += `
        <tr>
          <td>${emp.EmployeeID}</td>
          <td>${emp.Name}</td>
          <td>${emp.DepartmentName || 'N/A'}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error('Error loading employees:', error);
    alert('Failed to load employees.');
  }
}

// Add new employee
const employeeForm = document.getElementById('employeeForm');

if (employeeForm) {
  employeeForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const employee = {
      EmployeeID: document.getElementById('employeeId').value,
      Name: document.getElementById('employeeName').value,
      DepartmentID: document.getElementById('departmentId').value,
      ManagerID: document.getElementById('managerId').value || null
    };

    try {
      const res = await fetch(`${API_BASE}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Employee added successfully.');
        employeeForm.reset();
        loadEmployees();
      } else {
        alert(data.error || 'Failed to add employee.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Server error while adding employee.');
    }
  });
}

/* =========================
   REVIEWS MODULE
========================= */

// Load all reviews
async function loadReviews() {
  try {
    const res = await fetch(`${API_BASE}/reviews`);
    const data = await res.json();

    const tableBody = document.getElementById('reviewTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="empty-message">No review records found.</td>
        </tr>
      `;
      return;
    }

    data.forEach(review => {
      tableBody.innerHTML += `
        <tr>
          <td>${review.ReviewID}</td>
          <td>${review.EmployeeName}</td>
          <td>${review.Rating}</td>
          <td>${review.ReviewDate ? review.ReviewDate.toString().substring(0, 10) : ''}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error('Error loading reviews:', error);
    alert('Failed to load reviews.');
  }
}

// Add review
const reviewForm = document.getElementById('reviewForm');

if (reviewForm) {
  reviewForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const review = {
      ReviewID: document.getElementById('reviewId').value,
      EmployeeID: document.getElementById('reviewEmployeeId').value,
      ManagerID: document.getElementById('reviewManagerId').value || null,
      Rating: document.getElementById('rating').value,
      ReviewDate: document.getElementById('reviewDate').value
    };

    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Review added successfully.');
        reviewForm.reset();
        loadReviews();
      } else {
        alert(data.error || 'Failed to add review.');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Server error while adding review.');
    }
  });
}

/* =========================
   PERFORMANCE REPORT MODULE
========================= */

// Load performance report
async function loadPerformanceReport() {
  try {
    const res = await fetch(`${API_BASE}/performance-report`);
    const data = await res.json();

    const tableBody = document.getElementById('reportTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-message">No performance report data found.</td>
        </tr>
      `;
      return;
    }

    data.forEach(row => {
      tableBody.innerHTML += `
        <tr>
          <td>${row.EmployeeID}</td>
          <td>${row.Name}</td>
          <td>${row.DepartmentName || 'N/A'}</td>
          <td>${row.AverageRating ? Number(row.AverageRating).toFixed(2) : '0.00'}</td>
          <td>${row.TotalReviews || 0}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error('Error loading performance report:', error);
    alert('Failed to load performance report.');
  }
}

/* =========================
   DEVELOPMENT MODULE
========================= */

// Load Training + Certification data
async function loadDevelopmentData() {
  try {
    const res = await fetch(`${API_BASE}/development-data`);
    const data = await res.json();

    const tableBody = document.getElementById('developmentTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-message">No development data found.</td>
        </tr>
      `;
      return;
    }

    data.forEach(item => {
      tableBody.innerHTML += `
        <tr>
          <td>${item.EmployeeID}</td>
          <td>${item.EmployeeName}</td>
          <td>${item.TrainingTitle || 'N/A'}</td>
          <td>${item.SkillName || 'N/A'}</td>
          <td>${item.CertificationStatus || 'Not Certified'}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error('Error loading development data:', error);
    alert('Failed to load development data.');
  }
}

/* =========================
   REWARDS MODULE
========================= */

// Load Bonus + Promotion + Recognition data
async function loadRewardsData() {
  try {
    const res = await fetch(`${API_BASE}/rewards-data`);
    const data = await res.json();

    const tableBody = document.getElementById('rewardsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-message">No rewards data found.</td>
        </tr>
      `;
      return;
    }

    data.forEach(item => {
      tableBody.innerHTML += `
        <tr>
          <td>${item.EmployeeID}</td>
          <td>${item.EmployeeName}</td>
          <td>${item.BonusAmount || 'N/A'}</td>
          <td>${item.PromotionStatus || 'No'}</td>
          <td>${item.RecognitionTitle || 'N/A'}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error('Error loading rewards data:', error);
    alert('Failed to load rewards data.');
  }
}