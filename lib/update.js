const mysql = require('mysql');
const inquirer = require('inquirer');
const view = require('./view');
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

exports.updateEmployee = () => {
    view.viewAllEmployees(function (allEmployeesRes) {
        console.table(allEmployeesRes);
        let employeeChoices = [];
        for (var i = 0; i < allEmployeesRes.length; i++) {
            let empFullName = {
                name: allEmployeesRes[i].first_name + ' ' + allEmployeesRes[i].last_name,
                value: {
                    first_name: allEmployeesRes[i].first_name,
                    last_name: allEmployeesRes[i].last_name,
                    id: allEmployeesRes[i].employee_id

                }
            };
            employeeChoices.push(empFullName)
        };

        inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "employee",
                choices: employeeChoices

            }
        ]).then((answers) => {
            view.viewAllRoles(function (allRolesRes) {
                let roleChoices = [];
                console.table(answers.employee);
                for (var i = 0; i < allRolesRes.length; i++) {
                    let empRole = {
                        name: allRolesRes[i].title,
                        value: {
                            id: allRolesRes[i].acting_role_id,
                            role: allRolesRes[i].title
                        }
                    }
                    roleChoices.push(empRole);
                };
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Which role do they now have?",
                        name: "role",
                        choices: roleChoices
                    }
                ]).then((results) => {
                    console.table(results.role)
                    connection.query("UPDATE employees SET role_id = ? WHERE employee_id = ?", [results.role.id, answers.employee.id,], function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("Successfully updated Employee ID# " + answers.employee.id);
                        app.start();
                    })

                });
            });

        });
    });
};