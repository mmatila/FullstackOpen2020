type bmi = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese';

const calculateBmi = (height: number, weight: number): bmi => {
  const bmi: number = weight / ((height / 100) ^ 2);
  switch (true) {
    case bmi < 18.5:
      return 'Underweight';
    case bmi >= 18.5 && bmi <= 24.9:
      return 'Normal (healthy weight)'; 
    case bmi >= 25 && bmi < 30:
      return 'Overweight';
    default:
      return 'Obese';
  }
};

console.log(calculateBmi(180, 74))

export default calculateBmi;
