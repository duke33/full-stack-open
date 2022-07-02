interface BodyValues {
    height: number;
    weight: number;
  }

const parseArguments = (args: Array<string>): BodyValues => { 
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

const calculateBmi = (height:number,weight:number):string=>{

const heightInMeters = height/100;
const bmi = weight/(heightInMeters*heightInMeters);

switch(true){
    case (bmi<18.5):
        return "Underweight";
    case bmi<25:
        return "Normal";
     case bmi<30:
        return "Overweight";
    default:
        return "Obese";
}

}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }