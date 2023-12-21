const inquirer = require("inquirer");
const mySql = require("mysql2");
require("dotenv").config();
require("console.table");
const allEmp = [];
const allRole = [];

const db = mySql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

db.query("select * from employees", (err, results) => {
  for (let employee of results) {
    allEmp.push(`${employee.first_name} ${employee.last_name}`);
  }
});
db.query("select * from roles", (err, results) => {
  for (let role of results) {
    allRole.push(`${role.title}`);
  }
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menuChoice) {
        case "view all departments":
          // show all departments
          db.query("select * from department", (err, results) => {
            console.table(results);
            mainMenu();
          });
          break;
        case "view all roles":
          // show all roles
          db.query("select * from roles", (err, results) => {
            console.table(results);
            mainMenu();
          });
          break;

        case "view all employees":
          // show all employees
          db.query("select * from employees", (err, results) => {
            console.table(results);
            mainMenu();
          });
          break;

        case "add a department":
          // add a department
          // insert into department (dept_name) values (?)
          inquirer
            .prompt([
              {
                type: "input",
                name: "dept_name",
                message: "What would you like to call it?",
              },
            ])
            .then((answers) => {
              const sql = "INSERT INTO department (dept_name) VALUES (?)";
              const values = [answers.dept_name];

              db.query(sql, values, (err, results) => {
                if (err) {
                  console.error("Error adding department:", err);
                } else {
                  console.log("department created");
                  mainMenu();
                }
              });
            });
          break;

        case "add a role":
          // add a role
          inquirer
            .prompt([
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
              },
            ])
            .then((answers) => {
              const sql =
                "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
              const values = [
                answers.title,
                answers.salary,
                answers.department_id,
              ];

              db.query(sql, values, (err, results) => {
                if (err) {
                  console.error("Error adding role:", err);
                } else {
                  console.log("Role created");
                  mainMenu();
                }
              });
            });
          break;

        case "add an employee":
          // add an employee
          inquirer
            .prompt([
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
              },
            ])
            .then((answers) => {
              const sql =
                "INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)";
              const values = [
                answers.first_name,
                answers.last_name,
                answers.role_id,
              ];

              db.query(sql, values, (err, results) => {
                if (err) {
                  console.error("Error adding employee:", err);
                } else {
                  console.log("Employee created");
                  mainMenu();
                }
              });
            });
          break;

        case "update an employee role":
          // update an employee role
          inquirer
            .prompt([
              {
                type: "list",
                name: "id",
                message: "What employee id do you want to update?",
                choices: allEmp,
              },
              {
                type: "list",
                name: "role_list",
                message: "What role are you assigning to this employee?",
                choices: allRole,
              },
            ])
            .then((answers) => {
              let splitEmp = answers.id.split(" ");
              let roleId;
              db.query(
                `SELECT (id) FROM roles where title=(?)`,
                answers.role_list,
                (err, result) => {
                  if (err) {
                    console.error("Error updating employee:", err);
                  } else {
                    roleId = result[0].id;
                  }
                  updateRole();
                }
              );
              const updateRole = () => {
                let params = [roleId, splitEmp[0], splitEmp[1]];
                db.query(
                  `UPDATE employees SET role_id=(?) WHERE first_name=(?) and last_name=(?)`,
                  params,
                  (err, results) => {
                    if (err) {
                      console.error("Error updating employee:", err);
                    } else {
                      console.log("Employee updated");
                    }
                    mainMenu();
                  }
                );
              };
            });
          break;
        default:
          // exit
          process.exit();
      }
    });
}
mainMenu();
