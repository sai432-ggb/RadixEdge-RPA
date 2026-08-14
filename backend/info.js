// API Info Endpoint
export default function handler(req, res) {
  res.status(200).json({
    name: 'RadixEdge RPA',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    cloudPlatform: 'vercel'
  });
}
