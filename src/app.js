const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Add this example function for debugging
function calculateHealth() {
  const status = 'healthy';
  const timestamp = new Date().toISOString();
  debugger; // Add breakpoint
  return {
    message: "healthy",
    name: "healthcheck",
    status,
    timestamp
  };
}

app.get('/health', (req, res) => {
  const healthStatus = calculateHealth();
  res.status(200).json(healthStatus);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 