const calculateBmi = (height:number,weight:number)=>{

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


console.log(calculateBmi(173, 71))