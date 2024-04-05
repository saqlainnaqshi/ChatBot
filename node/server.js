const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 5000;

app.use(express.json()); 
app.use(cors());

app.post('/api', async (req, res) => {
  try {
    const  data  = req.body;
    console.log(data)
    // const response = await axios.post('http://localhost:3000/v1/generate', data, { 
    const response = await axios.post('https://ad34-2405-201-5508-8c61-fdcd-453-eda0-c692.ngrok-free.app/v1/generate', data, { 
      headers: {
        'Content-Type': 'application/json', 
        ...req.headers, 
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    res.status(response.status).send(response.data);
    // res.send(data)
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Proxy error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
