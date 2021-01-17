const mysql = require('mysql');
const table = require('console.table');
const app = require('../app');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'ATN7U5cV',
    database: 'employees_db'
});

exports.viewAllEmployees = () => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}