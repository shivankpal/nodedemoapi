const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'archimedes.cc7hys9wwxz7.ap-south-1.rds.amazonaws.com',
    user: 'neumann',
    password: '6.62607004',
    database: 'tmp'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//show all products
app.get('/api/list', (req, res) => {
    let sql = "SELECT * FROM testdemo";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//add new product
app.post('/api/add', (req, res) => {
    console.log(req.body)
    let sql = "INSERT INTO testdemo(`full_name`, `email`, `phone`) VALUES('" + req.body.full_name + "', '" + req.body.email + "', '" + req.body.phone+"') ";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
    
});
//add new product
app.post('/api/update/:id', (req, res) => {
    let sql = "UPDATE testdemo SET `full_name` = '" + req.body.full_name + "', `email`= '" + req.body.email + "', `phone` = '" + req.body.phone + "' WHERE id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});
//Delete product
app.post('/api/delete/:id', (req, res) => {
    let sql = "DELETE FROM testdemo WHERE id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//Server listening
app.listen(9000, () => {
    console.log('Server started on port 9000...');
});