/**
 * Description: This is simple express server.
 *
 * Author: Nitish Mehta
 * Email: mnitish0@gmail.com
 * LinkedIn: https://au.linkedin.com/in/nitish-mehta-software-developer
 *
 * License: MIT
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5050;

// middleware
app.use(cors());

// Mock Data 
const people = [
  { name: 'John Doe', age: 30, location: 'New York' },
  { name: 'Jane Smith', age: 25, location: 'London' },
  { name: 'Alice Johnson', age: 35, location: 'Paris' },
  { name: 'John Wick', age: 60, location: 'France' },
  { name: 'Dwayne Johnson', age: 60, location: 'USA' },
  { name: 'Vin Digel', age: 35, location: 'USA' },
  { name: 'Tom Cruse', age: 35, location: 'Paris' },
  { name: 'Jason stathom', age: 35, location: 'USA' },
  { name: 'Robert Wilson', age: 35, location: 'Paris' }
];

app.get('/api/people', (req, res) => {
  res.json(people);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
