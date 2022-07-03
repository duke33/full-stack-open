interface returnValue {
// the number of days
periodLength:number;
// the number of training days
trainingDays:number;
// the original target value
target:number;
// the calculated average time
average:number;
// boolean value describing if the target was reached
success:boolean;
// a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
rating:number
// a text value explaining the rating
ratingDescription:string
}

// interface Arguments {
//   dailyExerciseHours: Array<number>;
//   target: number;
// }


// const parseArguments2 = (args: Array<string>): Arguments => { 
 
//   const target = Number((args[2]));
//   const dailyExerciseHours = (args.slice(3)).map(e=>Number(e));
//   const allNumbers = dailyExerciseHours.every(e=>!isNaN(e));
//   if (allNumbers) {
        
//     return {
//       dailyExerciseHours,
//             target
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }

// };



export const calculateExercises = (dailyExerciseHours:Array<number>,target:number ):returnValue=>{
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average = dailyExerciseHours.reduce((a,b) => a + b, 0)/periodLength;
  const success = average >= target;
  const rating =(average/target)*3;
  let ratingDescription = "";
  if(rating < 1){
    ratingDescription = " Super Lazy";
  }
  if(rating >= 1 && rating < 2){
    ratingDescription = "Lazy";
  }
  if(rating >= 2 && rating < 3){
    ratingDescription =  "not too bad but could be better";
  }
  if(rating >= 3){
    ratingDescription = "Awesome";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


// try {
//   const { dailyExerciseHours, target } = parseArguments2(process.argv);
//   console.log(calculateExercises(dailyExerciseHours, target));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }