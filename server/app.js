/*jshint esversion: 6 */
require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var project = require('./routes/project');
var cohort = require('./routes/cohort');
var team = require('./routes/team');
var member = require('./routes/member');
var person = require('./routes/person');

var portDecision = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

//Jason
app.use('/cohort', cohort);
//Casey & Andrew
app.use('/project', project);
//Steve
app.use('/team', team);
app.use('/member', member);
//Jeff
app.use('/person', person);

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
