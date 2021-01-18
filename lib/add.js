const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const app = require('../app');
const view = require('./view');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'ATN7U5cV',
    database: 'employees_db'
});

exports.addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employee's role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employee's manager's ID?"
        }

    ])
        .then(function (res) {
            connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
                if (err) throw err;
                console.table(res);
                console.log("Employee Added!");
                app.start();
            })
        })
}


exports.addRole = () => {
    view.viewAllDeptCB(function (allDeptRes) {
        let deptChoices = [];
        for (var i = 0; i < allDeptRes.length; i++) {
            let deptName = {
                name: allDeptRes[i].dept_name,
                value: {
                    dept_name: allDeptRes[i].dept_name,
                    id: allDeptRes[i].dept_id
                }
            };
            deptChoices.push(deptName)
        };

        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the role to be added?"
            },
            {
                type: "number",
                name: "salary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                message: "Which department is this role in?",
                name: "dept",
                choices: deptChoices

            }
        ])
            .then(function (res) {
                connection.query('INSERT INTO acting_role (title, salary, dept_id) VALUES (?, ?, ?)', [res.roleName, res.salary, res.dept.id], function (err, data) {
                    if (err) throw err;
                    console.log("Role Successfully Added!");
                    app.start();
                })
            })
    })
}


exports.addDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?"
        },
    ])
        .then(function (res) {
            connection.query('INSERT INTO department (dept_name) VALUES (?)', [res.deptName], function (err, data) {
                if (err) throw err;
                console.log("Department successfully added!");
                app.start();
            })
        })
}