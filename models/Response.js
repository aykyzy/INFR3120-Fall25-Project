
//  Import mongoose library to interact with MongDB
const mongoose = require('mongoose');

//----Schema code below----//

//Schema for individual answers
const AnswerSchema = new mongoose.Schema({
  
    //Question ID stores obkectID and the id field must be provided
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
 
  //Choice ID stores objectID and the id field must be provided
  choiceId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

// Schema for responses to surveys
const ResponseSchema = new mongoose.Schema({
  //Survey ID | ref refers to the survey model to establish relationship | Response must be provided
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  
  //Stores all the answers written by the user
  //Defualt conditiona of array if no answers provided
  answers:  { type: [AnswerSchema], default: [] },

  //Add automatic createdAt and updatedAt fields to track timestamps
}, { timestamps: true });

// This will create or use the 'responses' collection in the MongoDB database
module.exports = mongoose.model('Response', ResponseSchema);