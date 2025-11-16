//Imports below


//Loads express
const express = require('express');
//Create a router object
const router = express.Router();
//Imports the Survey model and the repsonse model
const Survey = require('../models/Survey');
const Response = require('../models/Response');

//Creates a get route for Surveys
router.get ('/surveys', async (req, res) => {
    // Filters the surveys based on query parameter. if isActive is in the query include {isactive=true}
    const filter = req.query.isActive === 'true' ? { isActive: true } : {};
    //find surveys matching the filter and sort them based on creation date in descending order
    const surveys = await Survey.find(filter).sort({ createdAt: -1 });
    //Sent the list of surveys as a JSON response
     res.json(surveys);
});

//Extracts surveys based on their ID's
router.get('/surveys/:id', async (req, res) => {
    //look up the survey by its ID from the URl
  const survey = await Survey.findById(req.params.id);
  //if survey is not found thn return error 404
  if (!survey) return res.status(404).json({ error: 'Not found' });
  //if found return the survey as a JSON response
  res.json(survey);
});

//post route for creating a new survey
router.post('/surveys', async (req, res) => {
    //extract survey from the body of the request
    const { title, description, questions, isActive } = req.body;
    //if quetions are not provided set to empty array
  const survey = await Survey.create({ title, description, questions: questions || [], isActive });
  //A new survey is created with the status code 201
  res.status(201).json(survey);
});
//update an existing survey using its ID
router.put('/surveys/:id', async (req, res) => {
    //Extract survey details from the request body
      const { title, description, questions, isActive } = req.body;
        //A database query to find the survey using its id and update the details
      const updated = await Survey.findByIdAndUpdate(
       //the id of the survey that needs to be updated
        req.params.id,
        //new values that the survey will have
        { title, description, questions: questions || [], isActive },
        //refreshes the survey and returns the updated version
        { new: true });

        //error condition code
        
        //if survey doesnt exist return a survey not found 404 error
        if (!updated) return res.status(404).json({ error: 'Not found' });
        //if found return the survey as a JSON response
        res.json(updated);
});

// Delete survey by using its ID
router.delete('/surveys/:id', async (req, res) => {
    //extract the survey ID fromt theu URl
    const surveyID = req.params.id; 
    //any responses linked t the survey will be deleted
    await Response.deleteMany({ surveyId: surveyID});
    //removes the survey itself
    const removeSurvey = await Survey.findByIdAndDelete(surveyID);
    //if no survey was removed return the 404 error code
    if (!removeSurvey) {
        return res.status(404).json({ error: 'Not found' });
    }

//emtpty 204 success response
res.status(204).end();
});

//create a new response for survey
router.post('/surveys/:id/responses', async (req, res) => {
    //ID of the array 
    const surveyID = req.params.id;
    //list of answers being provided. if no answers return it as an empty array
    const answerslist = req.body.answers || [];

    //check if the current survey exists in the database using ID
    const existingSurvey = await Survey.findById(surveyID);
    //if the survey does not exit do the return 404 error
    if (!existingSurvey){
      return res.status(404).json({ error: 'Survey not found' });  
    }

    //creates and stores a new response document
    const newResponse = await Response.create({
        surveyId: surveyID,
        answers: answerslist
    });

    //Returns saved response with status 201
    res.status(201).json(newResponse);
});



//survey results
router.get('/surveys/:id/results', async (req, res) => {
    //extracts the survey id from the URL
    const surveyID = req.params.id;

    //if surveey is not found then return 404 error
    const survey = await Survey.findById(surveyID);
    if(!survey) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    //find every response linked to the survey
    const responses = await Response.find ({surveyId: survey._id});
    //empty choice to store choice count
    const counts = {};

    //for every question in the survey
    for (const q of survey.questions) {

        //create an empty object to store choice count
        counts[q._id] = {}; 
        //for every choice in the question  set its intiial vote count to 0
        for (const c of q.choices) counts[q._id][c._id] = 0;

    }
    //for every response submitted to the survey
    for (const r of responses){
        //for every answer within that response
        for (const a of r.answers){
            //ensure the question choice is in the counts object
             if (counts[a.questionId] && counts[a.questionId][a.choiceId] !== undefined) {
                //increase the counts for that choice by 1
                counts[a.questionId][a.choiceId] += 1;
        }
    }
}

//retrun the final survey info, number of counts and number of responses
res.json({ survey, total: responses.length, counts });
