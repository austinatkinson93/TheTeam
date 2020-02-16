const fs = require("fs")

let outputArr = [];

let createHtml = function (array) {
    array.forEach(async (element) => {
        switch (element.title) {
            case "Manager":
                let managerOutput = fs.readFileSync("./templates/manager.html", "utf8")
                managerOutput = managerOutput
                    .replace("{{ title }}", element.title)
                    .replace("{{ name }}", element.name)
                    .replace("{{ id }}", element.id)
                    .replace("{{ email }}", element.email)
                    .replace("{{ officenumber }}", element.officeNumber);
                outputArr.push(managerOutput)
                break;
            case "Intern":
                let internOutput = fs.readFileSync("./templates/intern.html", "utf8")
                internOutput = internOutput
                    .replace("{{ title }}", element.title)
                    .replace("{{ name }}", element.name)
                    .replace("{{ id }}", element.id)
                    .replace("{{ email }}", element.email)
                    .replace("{{ school }}", element.school);
                outputArr.push(internOutput)
                break;
            case "Engineer":
                let engineerOutput = fs.readFileSync("./templates/engineer.html", "utf8")
                engineerOutput = engineerOutput
                    .replace("{{ title }}", element.title)
                    .replace("{{ name }}", element.name)
                    .replace("{{ id }}", element.id)
                    .replace("{{ email }}", element.email)
                    .replace("{{ github }}", element.github);
                outputArr.push(engineerOutput)
                break;
            default:
                break;
        }
    });

    let outputfile = fs.readFileSync("./templates/main.html", "utf8");
    outputArr = outputArr.join(" ");
    outputfile = outputfile.replace("{{ mainContent }}", outputArr);
    fs.writeFile('./output/output.html', outputfile, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

}

// creatOutput = (outputArr) => {
// }
module.exports = createHtml