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

// Authentication Endpoints
// Store OTPs in memory (use database in production)
const otpStore = new Map();

app.post('/api/auth/send-otp', (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 10-minute expiry
    otpStore.set(email, {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    console.log(`✅ OTP sent to ${email}: ${otp}`);
    
    res.json({
      success: true,
      message: 'OTP sent successfully',
      debug: `OTP: ${otp} (for testing)`
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.json({ success: false, message: 'Email and OTP required' });
    }

    const storedOtp = otpStore.get(email);
    
    if (!storedOtp) {
      return res.json({ success: false, message: 'OTP not found or expired' });
    }

    if (storedOtp.expiresAt < Date.now()) {
      otpStore.delete(email);
      return res.json({ success: false, message: 'OTP expired' });
    }

    if (storedOtp.code !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid - delete it
    otpStore.delete(email);

    console.log(`✅ OTP verified for ${email}`);
    
    res.json({
      success: true,
      message: 'OTP verified successfully',
      user: { email, loginTime: new Date().toISOString() }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Serve main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║   RadixEdge RPA v1.0.0 (Cloud Ready)  ║
    ║   Server running on port ${PORT}          ║
    ║   Environment: ${process.env.NODE_ENV || 'development'}    ║
    ╚═══════════════════════════════════════╝
    `);
  });
}

// Export for Vercel serverless deployment
module.exports = app;
