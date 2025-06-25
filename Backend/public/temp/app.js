import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes      from './routes/auth.routes.js';
import adminRoutes     from './routes/admin.routes.js';
import employeeRoutes  from './routes/employee.routes.js';
import taskRoutes      from './routes/task.routes.js';
import uploadRoutes    from './routes/upload.routes.js';
import aiRoutes        from './routes/ai.routes.js';
import commentRoutes   from './routes/comment.routes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('hi this is home page');
  res.json({ message: 'Welcome to Task Management API' });
});
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);
app.use('/', taskRoutes);
app.use('/', uploadRoutes);
app.use('/', aiRoutes);
app.use('/', commentRoutes);

export default app;
