import express, { Application } from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import patientRoutes from './features/patient/patient.routes';
import appointmentRoutes from './features/appointment/appointment.routes';
import dashboardRoutes from './features/dashboard/dashboard.routes';
import authRoutes from './features/auth/auth.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Feature routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handler
app.use(errorHandler);

export default app;
