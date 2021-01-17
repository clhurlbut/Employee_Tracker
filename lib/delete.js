const mysql = require('mysql');
const inquirer = require('inquirer');
const view = require('view');
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

exports.deleteEmployee = () => {
    view.allEmployees(function (allEmployeesRes) {
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
                message: "Which employee would you like to delete?",
                name: "employee",
                choices: employeeChoices

            }
        ])
            .then(function (answer) {
                let query = 'DELETE FROM employee WHERE ?';
                connection.query(query, { id: answer.employee }, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log(res.affectedRows + " has been deleted!");
                    app.start();
                });
            });
    });
}
