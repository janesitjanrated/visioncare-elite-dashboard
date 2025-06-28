# Ocular Clinic Hub

A comprehensive management system for ocular clinics built with React, TypeScript, and PostgreSQL.

## Project Structure

- **Frontend**: React + TypeScript + Vite + shadcn/ui
- **Backend**: Express.js + PostgreSQL
- **Database**: PostgreSQL (local)

## Quick Start

### 1. Database Setup

First, set up your PostgreSQL database:

```bash
# Create the database
createdb visualDB

# Run the schema
psql -d visualDB -f backend/schema.sql
```

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Start the backend server
npm run dev:backend
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
# In a new terminal, start the frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Database Configuration

The database connection is configured in `backend/postgres-client.ts`:

```typescript
export const pool = new Pool({
  user: 'medlab',        // Your PostgreSQL username
  host: 'localhost',
  database: 'visualDB',
  password: '592954',    // Update this to your password
  port: 5432,            // Default PostgreSQL port
  ssl: false,
  connectionTimeoutMillis: 10000
});
```

**Update these values** to match your PostgreSQL configuration.

## Sample Login Credentials

- **Admin**: `admin@clinic.com` / `admin123`
- **Doctor**: `doctor@clinic.com` / `doctor123`

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:backend` - Start backend development server
- `npm run build` - Build frontend for production
- `npm run build:backend` - Build backend for production
- `npm run start:backend` - Start production backend server

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment

### Inventory
- `GET /api/inventory` - Get all inventory items
- `PUT /api/inventory/:id` - Update inventory item

### Orders
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order

## Features

- **Patient Management**: Add, view, and manage patient records
- **Appointment Scheduling**: Schedule and track appointments
- **Employee Management**: Manage clinic staff
- **Inventory Tracking**: Track medical supplies and equipment
- **Financial Management**: Track revenue and expenses
- **Payroll System**: Manage employee salaries
- **Claims Processing**: Handle insurance claims

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, PostgreSQL, pg (PostgreSQL client)
- **Authentication**: Session-based with localStorage
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## Migration from Supabase

This project has been successfully migrated from Supabase to a local PostgreSQL database:

✅ **Completed**:
- Removed all Supabase dependencies
- Created Express.js backend server
- Updated all hooks to use new API client
- Created PostgreSQL database schema
- Updated authentication system
- Added comprehensive API endpoints

## Development

For detailed backend setup instructions, see [backend/README.md](backend/README.md).

## Troubleshooting

1. **Database connection error**: Check PostgreSQL is running and credentials are correct
2. **Port already in use**: Change the port in `server.ts` or kill the process using port 3001
3. **CORS errors**: The server is configured to allow all origins in development
4. **User not found**: Make sure you're using the correct PostgreSQL username (default: `medlab`)

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9e7a87b1-d79b-4c06-84a0-a625c0af4329

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9e7a87b1-d79b-4c06-84a0-a625c0af4329) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9e7a87b1-d79b-4c06-84a0-a625c0af4329) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
