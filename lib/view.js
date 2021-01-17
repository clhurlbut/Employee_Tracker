const mysql = require('mysql');
const table = require('console.table');
const app = require('../app');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'ATN7U5cV',
    database: 'employees_db'
});

exports.viewEntireCompany = () => {
    connection.query("SELECT role_id, first_name, last_name, employee_id FROM employees RIGHT JOIN acting_role ON employees.role_id = acting_role.acting_role_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        app.start();
    });
}

exports.viewAllEmployees = (callback) => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        callback(res);
    });
}

exports.viewAllRoles = (callback) => {
    connection.query('SELECT * FROM acting_role', function (err, res) {
        if (err) throw err;
        callback(res);
    });
}

exports.viewAllDept = (callback) => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        callback(res);
    });
}
