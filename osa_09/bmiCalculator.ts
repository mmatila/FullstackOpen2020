type bmi = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese';
interface metrics {
  height: number,
  weight: number
}

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

const parseArguments = (args: Array<string>): metrics => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log(error.message)
}

export default calculateBmi;
