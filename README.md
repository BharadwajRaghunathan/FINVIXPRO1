# FINVIX – AI-Powered Marketing Analytics Platform

Finvix is an AI-powered marketing analytics platform designed to help businesses optimize their marketing strategies by predicting key performance metrics such as Return on Investment (ROI) and Conversions. It leverages advanced machine learning models to provide real-time insights and actionable recommendations, empowering users to make data-driven decisions.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- Dual-Metric Predictions: Forecasts both ROI and Conversions for comprehensive campaign analysis.
- Real-Time Analytics: Delivers instant insights through an interactive dashboard.
- AI-Driven Recommendations: Provides actionable strategies using the Gemini AI API.
- User-Friendly Interface: Built with React for an intuitive and responsive experience.
- Secure Authentication: Implements JWT-based authentication to protect user data.
- Scalable Architecture: Uses Flask for a lightweight and efficient backend.

---

## Technologies

### Frontend

- React
- React Router
- Framer Motion
- React ChartJS-2
- Axios

### Backend

- Flask
- SQLAlchemy
- JWT (JSON Web Tokens)
- Pandas and NumPy
- XGBoost

### Database

- PostgreSQL

### External Services

- Gemini AI API

---

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- PostgreSQL 12 or higher
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/UnisysUIP/2025-FINVX.git
cd 2025-FINVX
```

### 2. Set Up the Backend

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

- Create a `.env` file in the root directory and add the following:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=finvix_db
JWT_SECRET_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

- Initialize the database:

```bash
flask db init
flask db migrate
flask db upgrade
```

### 3. Set Up the Frontend

```bash
cd frontend
npm install
```

---

## Usage

### Running the Application

Start the backend:

```bash
cd backend
python app.py
```

Start the frontend:

```bash
cd frontend
npm start
```

Access the application in your browser at: http://localhost:3000

### Functional Overview

- User Authentication: Register and log in to access the dashboard.
- Dashboard Analytics: Monitor real-time marketing performance metrics.
- Manual Forecasting: Enter campaign parameters to predict ROI and conversions.
- File Uploads: Upload CSV or Excel files for batch forecasting.
- Reporting: Download detailed reports with analytics and AI-powered recommendations.

---

## Project Structure

```
2025-FINVX/
├── backend/               # Flask backend code
│   ├── app.py             # Main application file
│   ├── models.py          # ML models
│   ├── database_models.py # Database schema
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # React frontend code
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page-level views
│   │   ├── styles/        # CSS stylesheets
│   │   └── App.js         # Main React component
│   └── package.json       # Frontend dependencies
│
├── .env                   # Environment variables (excluded from Git)
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

---

## Contributing

We welcome contributions to Finvix. To contribute:

1. Fork the repository
2. Create a new branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes and commit:

```bash
git commit -m "Add your feature"
```

4. Push your branch:

```bash
git push origin feature/your-feature
```

5. Open a pull request to the main branch.

Please ensure your code follows the existing style, includes tests if applicable, and does not break existing functionality.

---

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

---

## Contact

For questions, feedback, or support, please contact the development team:

Email: finvix.support@example.com

Finvix – Transforming Marketing with AI-Powered Precision.
