// Application Monitoring Configuration
const monitoring = {
  // Error tracking
  errorTracking: {
    enabled: true,
    captureUncaught: true,
    captureUnhandledRejections: true,
    sampleRate: 1.0
  },
  
  // Performance monitoring
  performance: {
    enabled: true,
    tracesSampleRate: 0.2,
    trackTimeOnPage: true,
    trackPageLoadTime: true
  },
  
  // User analytics
  analytics: {
    enabled: true,
    trackUserJourney: true,
    trackClicks: true,
    trackFormSubmissions: true
  },
  
  // Health checks
  healthChecks: {
    endpoints: [
      '/api/health',
      '/api/status'
    ],
    interval: 60000, // Check every minute
    timeout: 5000
  },
  
  // Alerting thresholds
  alerting: {
    errorRateThreshold: 0.05, // Alert if error rate exceeds 5%
    responseTimeThreshold: 2000, // Alert if response time exceeds 2 seconds
    notificationChannels: ['email', 'slack']
  }
};

module.exports = monitoring;