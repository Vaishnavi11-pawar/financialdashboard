# Financial Analytics Dashboard

A full-stack web application for managing, analyzing, and visualizing personal and business financial transactions.  
Built with **React, TypeScript, Node.js, Express, and MongoDB**.

---

## 🚀 Live Demo

- **Frontend URL:**
- **Frontend Codebase:** [GitHub](https://github.com/Vaishnavi11-pawar/financialdashboard)
- **Backend URL:** (https://financialdashboard-sf0r.onrender.com)
- **API Documentation:** (https://www.postman.com/avengers-8990/workspace/financial-analytics/collection/41720353-58c1b1a2-e897-4273-bc24-96ad7406cc69?action=share&creator=41720353)

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Material UI, Recharts, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer (for avatar upload), JWT
- **Other:** CSV export, RESTful API, secure authentication

---

## 🏗️ Project Structure

```
backend/
  src/
    controllers/       # Request handlers (transactions, analytics, export, auth, etc.)
    models/            # Database schemas (User, Transaction, etc.)
    routes/            # API routes
    middleware/        # Auth, error handling, etc.
    data/              # Seed/sample data
    ...
  public/
frontend/
  finance-dashboard/
    src/
      components/      # Reusable UI components
      pages/           # Page-level components (Dashboard, Transactions, Analytics, Profile)
      api/             # API utilities
      types/           # TypeScript types
      ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/financial-analytics-dashboard.git
cd financial-analytics-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create a .env file (see .env.example if provided)
npm start
```
- The backend runs on [http://localhost:8080](http://localhost:8080) by default.

### 3. Frontend Setup

```bash
cd frontend/finance-dashboard
npm install
npm run dev
```
- The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

---

## 🌐 Environment Variables

**Backend (.env):**
```
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_jwt_secret
```

**Frontend:**  
- Update API URLs in `src/api/` if your backend runs on a different host/port.

---

## 📜 API Documentation

### Core Endpoints

#### 1. Authentication
- **Register:** `POST /auth/register` (supports avatar upload)
- **Login:** `POST /auth/login`
- **Logout:** `POST /auth/logout`
- **RefreshAccessToken:** `POST /auth/refresh`

#### 2. Transactions
- **List Transactions:** `GET /transactions` (supports filters, pagination)

#### 3. Analytics
- **Summary:** `GET /analytics/summary`
- **Trends:** `GET /analytics/trends`
- **Category Breakdown:** `GET /analytics/categories`
- 
 #### 4. Export
- **Export Transactions:** `POST /export` 

---

## 💡 Features

- **User Authentication:** Register, login, and secure session management.
- **Profile Management:** View user profile and avatar.
- **Dashboard:**  
  - Analytics summary (revenue, expenses, profit, paid/pending).
  - Revenue vs Expense trends (line/bar charts).
  - Category breakdown.
  - Recent transactions table with pagination and CSV export.
- **Transactions:**  
  - View all transactions with pagination.
  - Search, filter, and export to CSV.
- **Analytics:**  
  - Monthly revenue and expense trends (charts and tables).
  - Category breakdown.
- **Responsive UI:** Clean, modern design using Material UI.
- **Sidebar Navigation:** Dashboard, Transactions, Analytics, Profile, Settings, Help, Logout.

---

## ⚠️ Known Limitations & Assumptions

- Only basic user profile editing (avatar, name, email) is supported.
- CSV export is based on current filters and selected columns.
- Categories are predefined; you can extend them in the backend.
- No group or multi-user expense splitting (single-user focus).

---

## 🧪 Testing

- Use the provided Postman Collection for API testing.

---

## 📈 Future Enhancements

- User profile editing and password change.
- Group expense management and splitting.
- More advanced analytics (custom date ranges, charts).
- Notifications and reminders.
- Budget tracking and goals.


---

## 📸 Screenshots

![Screenshot 2025-06-30 135436](https://github.com/user-attachments/assets/2f182279-a950-4a45-905e-b085fd0c91ac)
![Screenshot 2025-06-30 135541](https://github.com/user-attachments/assets/a04aff52-e1e8-43a1-bf92-f41a001f09e0)
![Screenshot 2025-06-30 135603](https://github.com/user-attachments/assets/eb0ed0ee-1a35-46f3-9c50-db5b3f073e0f)
![Screenshot 2025-06-30 135646](https://github.com/user-attachments/assets/c55eba75-bb1f-4912-b640-b3041dbdaf7b)
![Screenshot 2025-06-30 135816](https://github.com/user-attachments/assets/42653dd7-62a7-4ceb-bf88-a77072a4901c)


---

---

## 🙏 Credits

- [Material UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)
- [json2csv](https://github.com/zemirco/json2csv)
