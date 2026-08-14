// RadixEdge RPA - Production Monitoring & Logging
// Integrates with popular monitoring services

import dotenv from 'dotenv';

dotenv.config();

/**
 * Logger Configuration
 * Supports: Console, File, Cloud services
 */
export const logger = {
  info: (message, data = {}) => {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({
      level: 'INFO',
      timestamp,
      message,
      ...data
    }));
    
    // Send to cloud monitoring if configured
    if (process.env.MONITORING_ENABLED === 'true') {
      sendToMonitoring('info', message, data);
    }
  },

  error: (message, error, data = {}) => {
    const timestamp = new Date().toISOString();
    console.error(JSON.stringify({
      level: 'ERROR',
      timestamp,
      message,
      error: error?.message || String(error),
      stack: error?.stack,
      ...data
    }));

    if (process.env.MONITORING_ENABLED === 'true') {
      sendToMonitoring('error', message, { error: error?.message, ...data });
    }
  },

  warn: (message, data = {}) => {
    const timestamp = new Date().toISOString();
    console.warn(JSON.stringify({
      level: 'WARN',
      timestamp,
      message,
      ...data
    }));
  }
};

/**
 * Performance Monitoring
 */
export const performanceMonitor = {
  trackRequest: (req, res, next) => {
    const startTime = Date.now();
    const originalJson = res.json;

    res.json = function(data) {
      const duration = Date.now() - startTime;
      logger.info('HTTP Request', {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip
      });
      return originalJson.call(this, data);
    };

    next();
  }
};

/**
 * Error Tracking
 */
export const errorTracker = {
  track: (error, context = {}) => {
    logger.error('Application Error', error, {
      context,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Health Check Metrics
 */
export const metrics = {
  requests: 0,
  errors: 0,
  avgResponseTime: 0,

  recordRequest: (duration) => {
    metrics.requests++;
    metrics.avgResponseTime = (metrics.avgResponseTime + duration) / 2;
  },

  recordError: () => {
    metrics.errors++;
  },

  getMetrics: () => ({
    uptime: process.uptime(),
    requests: metrics.requests,
    errors: metrics.errors,
    averageResponseTime: Math.round(metrics.avgResponseTime),
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
};

/**
 * Send metrics to monitoring service
 * Supports: Vercel Analytics, DataDog, New Relic, Sentry
 */
function sendToMonitoring(level, message, data) {
  try {
    // Example: Send to custom monitoring endpoint
    if (process.env.MONITORING_URL) {
      // Implement webhook or API call here
      console.debug(`[Monitoring] ${level}: ${message}`);
    }
  } catch (err) {
    console.error('Failed to send monitoring data', err.message);
  }
}

export default {
  logger,
  performanceMonitor,
  errorTracker,
  metrics
};
