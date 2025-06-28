# Backend Setup Instructions

This backend uses PostgreSQL and Express.js to provide API endpoints for the ocular clinic application.

## Prerequisites

1. **PostgreSQL** installed and running
2. **Node.js** and **npm** installed

## Database Setup

1. **Start PostgreSQL** and create the database:
   ```sql
   CREATE DATABASE visualDB;
   ```

2. **Connect to the database** and run the schema:
   ```bash
   psql -U postgres -d visualDB -f schema.sql
   ```

   Or connect to PostgreSQL and run:
   ```sql
   \i schema.sql
   ```

## Backend Configuration

The database connection is configured in `src/integrations/postgres/client.ts`:

```typescript
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'visualDB',
  password: '592954',
  port: 4955,
  ssl: false,
  connectionTimeoutMillis: 10000
});
```

**Update these values** to match your PostgreSQL configuration.

## Running the Backend

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev:backend
   ```

3. **Build and start production server**:
   ```bash
   npm run build:backend
   npm run start:backend
   ```

The server will run on `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /api/health` - Test database connection

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment

## Sample Users

The schema includes sample users for testing:
- Email: `admin@clinic.com`, Password: `admin123`
- Email: `doctor@clinic.com`, Password: `doctor123`

## Troubleshooting

1. **Database connection error**: Check PostgreSQL is running and credentials are correct
2. **Port already in use**: Change the port in `server.ts` or kill the process using port 3001
3. **CORS errors**: The server is configured to allow all origins in development

## Development

To add new endpoints:
1. Add the route in `server.ts`
2. Add the corresponding method in `src/integrations/api/client.ts`
3. Update the frontend components to use the new endpoint 