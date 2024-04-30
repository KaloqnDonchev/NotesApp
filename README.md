# CRUD Notes App

This is a basic CRUD (Create, Read, Update, Delete) notes app project built with a frontend and backend.

## Features

- Create, read, update, and delete notes.
- Simple and intuitive user interface.
- RESTful API endpoints for backend operations.

## Technologies Used

- Frontend:

  - React.js

- Backend:
  - Node.js
  - Express.js
  - Postgres

## How to Run

### Frontend

1. Clone this repository: `git clone https://github.com/KaloqnDonchev/NotesApp`

2. Navigate to the frontend directory: `cd \notes-app-frontend\vite-project`

3. Install dependencies: `npm install`

4. Start the frontend server: `npm run dev`

5. Open your web browser and go to `http://localhost:5173` to access the app.

### Backend

1. Navigate to the backend directory: `cd notes-app-backend`

2. Install dependencies: `npm install`

3. Start the backend server: `npm start`

4. The backend server will run on `http://localhost:8080`.

## API Endpoints

- GET `/api/notes`: Get all notes.
- POST `/api/notes`: Create a new note.
- PUT `/api/notes/:id`: Update an existing note by ID.
- DELETE `/api/notes/:id`: Delete a note by ID.
