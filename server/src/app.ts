import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error';
import emailRoutes from './routes/email.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', emailRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
  console.log('Email server initialized with configuration:');
  console.log(`- IMAP: ${process.env.EMAIL_IMAP_HOST}:${process.env.EMAIL_IMAP_PORT}`);
  console.log(`- SMTP: ${process.env.EMAIL_SMTP_HOST}:${process.env.EMAIL_SMTP_PORT}`);
});