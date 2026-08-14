// API Health Check Endpoint
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy', 
    app: 'RadixEdge RPA',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}
