# Medication Management System

A comprehensive web application for managing medications with role-based dashboards for patients and caretakers. Built with React, Node.js, and SQLite.

## Features

### Phase 1 (Implemented)
- *Secure Authentication*: User registration and login with JWT tokens
- *SQLite Database*: Persistent data storage with proper schema design
- *Medication CRUD*: Complete Create, Read, Update, Delete operations
- *Patient Dashboard*: Real-time medication tracking and adherence monitoring
- *Form Validation*: Comprehensive client-side validation with Zod
- *Adherence Tracking*: Percentage-based tracking with 7-day calculations
- *Responsive Design*: Mobile-first approach with Tailwind CSS
- *Error Handling*: Robust error handling with user-friendly messages
- *Loading States*: Proper loading indicators throughout the application

### Security Features
- Password hashing with bcrypt (12 salt rounds)
- JWT-based authentication with 7-day expiration
- Input sanitization to prevent XSS attacks
- SQL injection prevention with parameterized queries
- CORS configuration for secure API access

### Tech Stack
- *Frontend*: React 18, TypeScript, Tailwind CSS, React Query, React Hook Form
- *Backend*: Node.js, Express, SQLite3, JWT, bcrypt
- *Testing*: Vitest, React Testing Library
- *Validation*: Zod schema validation

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
bash
git clone <repository-url>
cd medication-management-system


2. Install dependencies:
bash
npm install


3. Start the development environment:
bash
npm run dev:full


This will start both the backend server (port 5000) and frontend development server (port 5173).

### Alternative Setup

To run frontend and backend separately:

1. Start the backend server:
bash
npm run server


2. In a new terminal, start the frontend:
bash
npm run dev


## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user info

### Medications
- GET /api/medications - Get user's medications
- POST /api/medications - Create new medication
- PUT /api/medications/:id - Update medication
- DELETE /api/medications/:id - Delete medication
- POST /api/medications/:id/taken - Mark medication as taken
- GET /api/medications/logs - Get medication logs
- GET /api/medications/adherence - Get adherence statistics

## Testing

Run the test suite:
bash
npm run test


The application includes:
- Component tests for UI components
- API utility function tests
- Authentication validation tests

## Database Schema

### Users Table
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password (TEXT) - Hashed with bcrypt
- name (TEXT)
- role (TEXT) - 'patient' or 'caretaker'
- created_at (DATETIME)

### Medications Table
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER FOREIGN KEY)
- name (TEXT)
- dosage (TEXT)
- frequency (TEXT)
- times_per_day (INTEGER)
- created_at (DATETIME)

### Medication Logs Table
- id (INTEGER PRIMARY KEY)
- medication_id (INTEGER FOREIGN KEY)
- user_id (INTEGER FOREIGN KEY)
- taken_date (DATE)
- taken_time (DATETIME)

## Project Structure


src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth)
├── pages/              # Page components
├── services/           # API services
├── test/               # Test files
└── ...

server/
├── routes/             # API route handlers
├── middleware/         # Express middleware
├── database.js         # Database operations
└── index.js           # Server entry point


## Environment Variables

Create a .env file in the root directory:

env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173


## Usage

### For Patients
1. Register with role "patient"
2. Add medications with dosage and frequency
3. Mark medications as taken daily
4. Monitor adherence statistics
5. View medication history

### For Caretakers
1. Register with role "caretaker"
2. Access same dashboard functionality
3. Manage medications for patients (future feature)

## Development Notes

### Code Organization
- Files are kept under 200 lines as per best practices
- Modular architecture with clear separation of concerns
- Proper imports/exports throughout the codebase

### Security Measures
- All user inputs are sanitized
- Parameterized SQL queries prevent injection attacks
- Password hashing with industry-standard bcrypt
- JWT tokens with reasonable expiration times

### Performance Optimizations
- React Query for efficient data fetching and caching
- Debounced form inputs where appropriate
- Proper loading states to prevent multiple requests

## Future Enhancements (Phase 2 & 3)

### Phase 2
- Real-time updates with WebSockets
- Advanced adherence tracking with graphs
- Multi-patient management for caretakers

### Phase 3
- Photo upload for medication proof
- Push notifications
- Deployment to production platforms
- Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Made by *Kethe Dev Chand* - A comprehensive medication management solution built with modern web technologies.
