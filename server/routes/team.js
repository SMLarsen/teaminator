var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool({
    database: config.database
});

router.get("/", function(req, res) {
    console.log('got to route');
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM team', function(err, result) {
                if (err) {
                    console.log('Error getting team', err);
                    res.sendStatus(500);
                    client.release();
                } else {
                    res.send(result.rows[0]);
                    console.log('retrieved team');
                    client.release();
                }
            });
        });
});

module.exports = router;
