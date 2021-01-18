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
    port: 3306,
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
    figlet('Welcome!', (err, result) => {
        console.log(err || result);
    });
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
                "EXIT"
            ]
        }
    ])
        .then(function (answer) {
            if (answer.choice === "View All Departments") {
                view.viewAllDept();
            }
            else if (answer.choice === "View All Roles") {
                view.viewAllRoles();
            }
            else if (answer.choice === "View All Employees") {
                view.viewEntireCompany();
            }
            else if (answer.choice === "Add Employee") {
                add.addEmployee();
            }
            else if (answer.choice === "Add Role") {
                add.addRole();
            }
            else if (answer.choice === "Add Department") {
                add.addDept();
            }
            else if (answer.choice === "Update Employee Role") {
                update.updateEmployee();
            }
            else if (answer.choice === "Delete Employee") {
                del.deleteEmployee();
            }
            else if (answer.choice === "Delete Role") {
                del.deleteRole();
            }
            else if (answer.choice === "Delete Department") {
                del.deleteDept();
            }
            else if (answer.choice === "EXIT") {
                figlet('Bye!', (err, result) => {
                    console.log(err || result);
                });
                connection.end();
                return
            }
        });
};