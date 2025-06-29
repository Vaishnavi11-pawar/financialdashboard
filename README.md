# Financial Analytics Dashboard

A full-stack web application for managing, analyzing, and visualizing personal and business financial transactions.  
Built with **React, TypeScript, Node.js, Express, and MongoDB**.

---

## 🚀 Live Demo

- **Frontend URL:** _[Add your deployed frontend link here]_
- **Frontend Codebase:** [GitHub](https://github.com/yourusername/financial-analytics-dashboard)
- **API Base URL:** _[e.g. http://localhost:8080/api or your deployed backend URL]_
- **API Documentation:** _[Add Postman Collection or Swagger link if available]_

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
- **Get Profile:** `GET /api/profile`

#### 2. Transactions
- **List Transactions:** `GET /transactions` (supports filters, pagination)
- **Export Transactions:** `POST /export` (CSV export with filters)
- **Add Transaction:** `POST /transactions`
- **Update Transaction:** `PUT /transactions/:id`
- **Delete Transaction:** `DELETE /transactions/:id`

#### 3. Analytics
- **Summary:** `GET /analytics/summary`
- **Trends:** `GET /analytics/trends`
- **Category Breakdown:** `GET /analytics/categories`

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

- Use the provided Postman Collection or Swagger docs for API testing.
- Frontend can be tested using Cypress or React Testing Library (not included by default).

---

## 📈 Future Enhancements

- User profile editing and password change.
- Group expense management and splitting.
- More advanced analytics (custom date ranges, charts).
- Notifications and reminders.
- Budget tracking and goals.
- Mobile app version.

---

## 📸 Screenshots

_Add screenshots or GIFs of your dashboard, analytics, and transaction pages here for better engagement._

---

## 📄 License

MIT

---

## 🙏 Credits

- [Material UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)
- [json2csv](https://github.com/zemirco/json2csv)
