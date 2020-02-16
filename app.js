const inquirer = require("inquirer")
const fs = require("fs")
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const html = require("./html.js");

let engineerResponse = {}
let employeesArr = [];


const employeePrompt = async () => {

    let employeeResponse = await inquirer
        .prompt([{
            type: "input",
            message: "What is the team members name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the team members email?",
            name: "email",
            validate: async (userInput) => {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (userInput.match(mailformat)) {
                    return true
                } else {
                    return "Not a valid Email Address."
                }
            }
        },
        {
            type: "input",
            message: "What is the team members ID number?",
            name: "id",
            // validate: async (userInput) => {
            //    employeesArr.forEach((employee, i)=>{
            //        if (employee[i].id !== userInput){
            //             return true
            //        } else {
            //            return "employee ID is already in use."
            //        }
            //    })
            // }
        }
        ])

    return employeeResponse
}


const managerPrompt = async () => {
    let managerResponse = await inquirer
        .prompt([{
            type: "input",
            message: "What is the Managers Office Number?",
            name: "officeNumber"
        }])

    return managerResponse
}

const anyMorePrompt = async () => {
    let anyMoreResponse = await inquirer
        .prompt([
            {
                type: "list",
                message: " Would you like to add additional team members?",
                choices: ["Engineer", "Intern", "No additional team members to add"],
                name: "moreTeam"
            }])

    let response;
    switch (anyMoreResponse.moreTeam) {
        case "Engineer":
            response = await employeePrompt();
            let engineerResponse = await engineerPrompt();
            let aEngineer = new Engineer(response.name, response.id, response.email, engineerResponse.githubUsername);
            employeesArr.push(aEngineer);
            await anyMorePrompt();
            break;
        case "Intern":
            response = await employeePrompt();
            let internResponse = await internPrompt();
            let aIntern = new Intern(response.name, response.id, response.email, internResponse.internSchool);
            employeesArr.push(aIntern);
            await anyMorePrompt();
            break;
        default:
            console.log(employeesArr)
            //createHTML()
            break;
    }
}

const internPrompt = async () => {
    const internResponse = await inquirer
        .prompt([{
            type: "input",
            message: "What school does the intern attend?",
            name: "internSchool"
        }])

    return internResponse
}

const engineerPrompt = async (employeeInfo) => {
    engineerResponse = await inquirer
        .prompt([{
            type: "input",
            message: "What is your Github Username?",
            name: "githubUsername"
        }])

    return engineerResponse
}

const appStart = async () => {
    let response = await employeePrompt();
    let managerResponse = await managerPrompt();
    let aManager = new Manager(response.name, response.id, response.email, managerResponse.officeNumber);
    employeesArr.push(aManager);
    await anyMorePrompt();
    await html(employeesArr)
}


appStart()

module.exports - employeesArr