// RadixEdge RPA - Cloud Ready Server
// Supports deployment on AWS, Azure, GCP

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Health check endpoint (for load balancers & Kubernetes)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    app: 'RadixEdge RPA',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API endpoints
app.get('/api/info', (req, res) => {
  res.json({
    name: 'RadixEdge RPA',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    cloudPlatform: process.env.CLOUD_PLATFORM || 'local'
  });
});

// Serve main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   RadixEdge RPA v1.0.0 (Cloud Ready)  ║
  ║   Server running on port ${PORT}          ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}    ║
  ╚═══════════════════════════════════════╝
  `);
});

export default app;
