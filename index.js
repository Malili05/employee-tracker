const inquirer = require('inquirer');
const mySql = require("mysql2");
require("dotenv").config()
require("console.table")

const db = mySql.createConnection({
    host:"127.0.0.1",
    port: 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})
db.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})
function mainMenu(){
inquirer
  .prompt([
    {
      type: "list",
      name: "menuChoice",
      message: "What would you like to do?",
      choices: ["view all departments","view all roles","view all employees","add a department", "add a role", "add an employee", "update an employee role", "exit"]
    },
  ])
.then (answers => {
    switch(answers.menuChoice){
        case 'view all departments':
            // show all departments
            db.query("select * from department", (err, result) =>{
                console.table(result)
                mainMenu()
            })
            break;
        case 'view all roles':
            // show all roles
            db.query("select * from roles", (err, result) =>{
                console.table(result)
                mainMenu()
            })
            break;

        case 'view all employees':
            // show all employees
            db.query("select * from employees", (err, result) =>{
                console.table(result)
                mainMenu()
            })
            break;

        case 'add a department':
            // add a department
            // insert into department (dept_name) values (?)
            inquirer.prompt([
                {
                    type: "input",
                    name: "dept_name",
                    message: "What would you like to call it?",
                }
            ])  .then(answers => {
                const sql = "INSERT INTO department (dept_name) VALUES (?)";
                const values = [answers.dept_name];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.error("Error adding department:", err);
                    } else {
                        console.log("department created");
                        mainMenu();
                    }
                });
            })
            break;

        case 'add a role':
            // add a role
            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What would you like to call it?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What would you like to pay it?",
                },
                {
                    type: "input",
                    name: "department_id",
                    message: "What department does it belong to?",
                }
            ]) .then(answers => {
                const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
                const values = [answers.title, answers.salary, answers.department_id];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.error("Error adding role:", err);
                    } else {
                        console.log("Role created");
                        mainMenu();
                    }
                });
            })
            break;

        case 'add an employee':
            // add an employee
            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the employee first name?",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the employee last name?",
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "What is the employee role id (1-15)?",
                }
            ]) .then(answers => {
                const sql = "INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)";
                const values = [answers.first_name, answers.last_name, answers.role_id];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.error("Error adding employee:", err);
                    } else {
                        console.log("Employee created");
                        mainMenu();
                    }
                });
            })
            break;

        case 'update an employee role':
            // update an employee role
            break;
        default :
            // exit
            process.exit()

    }
})
}
mainMenu()
