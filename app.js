const inquirer = require("inquirer")
const fs = require("fs")
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
let engineerResponse = {}

const employeePrompt = async () => {

    let employeeResponse = await inquirer
        .prompt([{
            type: "input",
            message: "What is the team memebers name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the team members email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the team members ID number?",
            name: "managerId"

        },
        {
            type: "choice",
            message: " Would you like to add additional team members?",
            choice: ["Engineer", "Intern", "No additional team members to add"],
            name: "moreTeam"
        }
        ])

    return employeeResponse
}


const managerPrompt = async () => {
    let managerResponse = await inquirer
        .prompt([{
            type: "input",
            messgae: "What school does the intern attend?"
        },
        {
            type: "input",
            message: "What is the Managers Office Number?",
            name: "managersOfficeNumber"
        },
        ])

    return managerResponse
}

const internPrompt = async () => {
    const internResponse = await inquirer
        .prompt([{
            type: "input",
            messgae: "What school does the intern attend?",
            name: "internSchool"
        }])

    return internResponse
}

const engineerPrompt = async () => {
    engineerResponse = await inquirer
        .prompt([{
            type: "input",
            message: "What is your Github Username?",
            name: "githubUsername"
        }])

    return engineerResponse
}

const appStart = async () => {
  await engineerPrompt()
  await console.log("appstart " + engineerResponse.githubUsername)


}


appStart()