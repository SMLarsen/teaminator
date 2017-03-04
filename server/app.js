/*jshint esversion: 6 */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const project = require('./routes/project');
const cohort = require('./routes/cohort');
const team = require('./routes/team');
// const person = require('./routes/person');

const portDecision = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

//Jason
app.use('/cohort', cohort);
//Casey & Andrew
// app.use('/project', project);
//Steve
app.use('/team', team);
//Jeff
// app.use('/person', person);

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
