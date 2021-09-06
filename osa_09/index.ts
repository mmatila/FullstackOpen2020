import express from 'express';

import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: 'Query parameters "height" and "weight" required' });
    return;
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'Malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(Number(height), Number(weight)); 
  res.json({
    height: Number(height),
    weight: Number(weight),
    bmi,
  });
});

const PORT = 3003
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
