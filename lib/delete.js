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

exports.deleteEmployee = () => {
    view.viewAllEmployeesCB(function (allEmployeesRes) {
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
                connection.query('DELETE FROM employees WHERE employee_id = ?', [answer.employee.id], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log(res.affectedRows + " has been deleted!");
                    app.start();
                });
            });
    });
}


exports.deleteDept = () => {
    view.viewAllDeptCB(function (allDeptRes) {
        let deptChoices = [];
        for (var i = 0; i < allDeptRes.length; i++) {
            let deptName = {
                name: allDeptRes[i].dept_name,
                value: {
                    dept_name: allDeptRes[i].dept_name,
                    dept_id: allDeptRes[i].dept_id
                }
            };
            deptChoices.push(deptName)
        };

        inquirer.prompt([
            {
                type: "list",
                message: "Which department would you like to delete?",
                name: "department",
                choices: deptChoices

            }
        ])
            .then(function (res) {
                connection.query('DELETE FROM department WHERE dept_id = ?', [res.department.id], function (err, res) {
                    if (err) throw err;
                    console.log("The department has been successfully deleted!");
                    app.start();
                });
            });
    });
}


exports.deleteRole = () => {
    view.viewAllRolesCB(function (allRoleRes) {
        let roleChoices = [];
        for (var i = 0; i < allRoleRes.length; i++) {
            let roleName = {
                name: allRoleRes[i].title,
                value: {
                    title: allRoleRes[i].title,
                    id: allRoleRes[i].acting_role_id
                }
            };
            roleChoices.push(roleName)
        };

        inquirer.prompt([
            {
                type: "list",
                message: "Which role would you like to delete?",
                name: "role",
                choices: roleChoices

            }
        ])
            .then(function (res) {
                connection.query('DELETE FROM acting_role WHERE acting_role_id = ?', [res.role.id], function (err, res) {
                    if (err) throw err;
                    console.log("The department has been successfully deleted!");
                    app.start();
                });
            });
    });
}
