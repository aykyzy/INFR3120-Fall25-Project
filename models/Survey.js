// Import mongoose library to interact with MongDB
const mongoose = require('mongoose');

//----Schema code below----//

//Schema for indavidual choices
const ChoiceSchema = new mongoose.Schema(
//The choice type is a string and must be provided (cant be empty)
  { text: { type: String, required: true }}, 
//include an id feild for each choice
{ _id: true });

//Schema for questions that have multiple choices
const QuestionSchema = new mongoose.Schema({
    //The question text is a string and must be provided (cant be empty)
   text: { type: String, required: true },

   //Array of choices using the choises schema defined first while default is an empty array if no choices are provided
  choices: { type: [ChoiceSchema], default: [] }
//each question will have its own id
}, { _id: true }); 

// The schema assigned for survey
const SurveySchema = new mongoose.Schema({
  // The title of the survey is a required feild
  title: { type: String, required: true },

  // description of survey
  description: String,

  // Indicates if the survey is currently active defualt value is set to true
  isActive: { type: Boolean, default: true },

//Array for questions using question schema. Defualt empty array for no questions added
  questions: { type: [QuestionSchema], default: [] }

//Mongoose automatically adds createdAt and updatedAt timestamps
}, { timestamps: true }); 

//Export Mongood model "Survey" for survey scheme. Represents "surveys" collection in MongoDB
module.exports = mongoose.model('Survey', SurveySchema);












