const express = require('express');
const router = express.Router();
const pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool(config.pg);

router.post('/', function(req, res) {
  pool.connect()
    .then(function(client) {
      client.query('', function(err, result) {
        if(err) {

        } else {

        }
      });
    });
});//End route

router.get('/', function(req, res) {
  pool.connect()
    .then(function(client) {
      client.query(''. function(err, result) {
        if(err) {

        } else {

        }
      });
    });
});//End route
