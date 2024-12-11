# Task Manager Application

A simple task manager application built with React and Express. It allows users to manage tasks with progress tracking and authentication.

## Features

- User authentication (sign up and sign in)
- Add, edit, and delete tasks
- Track progress with color-coded progress bars
- Backend powered by Express.js and PostgreSQL

---

## Installation and Setup

Follow these steps to run the application locally.

### Prerequisites

- Node.js (v16 or later) and npm/yarn installed
- PostgreSQL database setup
- A `.env` file with the required environment variables

### Backend Setup

1. Clone the repository:
   ```shell
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Navigate to the backend directory:
   ```shell
   cd backend
   ```

3. Install dependencies:
   ```shell
   npm install
   ```

4. Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=8000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```shell
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```shell
   cd ../frontend
   ```

2. Install dependencies:
   ```shell
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the following:
   ```env
   REACT_APP_SERVERURL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```shell
   npm start
   ```

## Usage

Open your browser and navigate to:
```arduino
http://localhost:3000
```

1. Sign up for an account and log in.
2. Manage tasks by adding, editing, deleting, and tracking their progress.

## Project Structure

```bash
task-manager/
├── Server/
│   ├── server.js
│   ├── database.js
│   ├── routes/
│   ├── controllers/
│   └── .env
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── .env
│   ├── public/
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Styling:** CSS

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

