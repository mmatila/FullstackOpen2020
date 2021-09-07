import express from 'express';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

interface exercises {
  daily_exercises: Array<number>,
  target: number
}

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

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as exercises;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  
  if (isNaN(target) || daily_exercises.some((hours) => isNaN(hours))) {
    return res.status(400).json({ error: 'malformatted parameters'});
  }
  
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
