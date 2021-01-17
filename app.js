const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const figlet = require('figlet');
const view = require('./lib/view');
const add = require('./lib/add');
const update = require('./lib/update');
const del = require('./lib/delete');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3030,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'ATN7U5cV',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    exports.start();
});

exports.start = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "Delete Employee",
                "EXIT"
            ]
        }
    ])
        .then(function (answer) {
            if (answer.choice === "View All Employees") {
                view.viewAllEmployees();
            }
            else if (answer.choice === "Add Employee") {
                add.addEmployee();

            }
            else if (answer.choice === "Update Employee Role") {
                update.updateEmployee();

            }
            else if (answer.choice === "Delete Employee") {
                del.deleteEmployee();

            }
            else if (answer.choice === "EXIT") {
                console.log("Thanks for using Employee Tracker! Goodbye!");
                connection.end();
                return
            }
        });
};