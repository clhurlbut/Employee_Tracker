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
    connection.query("SELECT e.employee_id, e.first_name, e.last_name, title, salary, dept_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employees AS e INNER JOIN acting_role AS a ON e.role_id = a.acting_role_id INNER JOIN department AS d ON a.dept_id = d.dept_id LEFT JOIN employees AS m ON e.manager_id = m.employee_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        app.start();
    });
}

exports.viewAllEmployees = () => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        app.start();
    });
}

exports.viewAllRoles = () => {
    connection.query('SELECT * FROM acting_role', function (err, res) {
        if (err) throw err;
        console.table(res);
        app.start();
    });
}

exports.viewAllDept = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        app.start();
    });
}

exports.viewAllEmployeesCB = (callback) => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        callback(res);
    });
}

exports.viewAllRolesCB = (callback) => {
    connection.query('SELECT * FROM acting_role', function (err, res) {
        if (err) throw err;
        callback(res);
    });
}

exports.viewAllDeptCB = (callback) => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        callback(res);
    });
}

