type rating = 1 | 2 | 3;
type ratingDescription = 'boo' | 'ayt, ayt' | 'sheeeesh'

interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: rating,
  ratingDescription: ratingDescription,
  target: number,
  average: number
};

const generateRating = (average: number, target: number): rating => {
  switch (true) {
    case average < target:
      return 1;
    case average === target:
      return 2;
    default:
      return 3;
  }
}

const getDescription = (rating: rating): ratingDescription => {
  switch (rating) {
    case 1:
      return 'boo'
    case 2:
      return 'ayt, ayt'
    case 3:
      return 'sheeeesh';
  }
}

const calculateExercises = (hours: Array<number>, target: number): result => {
  const periodLength: number = hours.length
  const trainingDays: number = hours.filter(hours => hours !== 0).length
  const average: number = hours.reduce((acc, curr) => curr + acc) / periodLength;
  const success: boolean = average >= target
  const rating: rating = generateRating(average, target)
  const ratingDescription: ratingDescription = getDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};

console.log(calculateExercises([1, 2, 3, 4, 5, 6, 8], 4));

export default calculateExercises;
