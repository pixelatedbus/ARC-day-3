import chalk from "chalk";
import inquirer from "inquirer";

let number1;
let number2;
let choice;

let calc = [
    {
        name: "sum",
        function: sum
    },
    {
        name: "multiply",
        function: multiply
    },
    {
        name: "div",
        function: div
    },
    {
        name: "subtract",
        function: subtract
    }
]

const wait = (n = 1000) => new Promise((resolve) => setTimeout(resolve, n))

async function start() {
    console.log(chalk.yellowBright("Welcome to my calculator! Please pick 2 numbers ~"));
    await number1a();
    await number2a();
    if (!isNaN(number1) && !isNaN(number2)){
        console.log(chalk.yellowBright("What a nice pair of numbers. What would you like to do?"));
        for (let i in calc) {
            console.log((Number(i)+1) + ". " + calc[i].name);
        }
        await choicea();
        choice = Number(choice)-1
        if (choice >= 0 && choice <= 3){
            console.log(chalk.yellowBright("Wait..."))
            await wait();
            console.log(chalk.greenBright("Here you go!"))
            calc[choice].function(print, number1, number2);
        } else {
            console.log("that doesnt make sense, try again!")
            start()
        }
    } else
    {
        console.log(chalk.bgRedBright(chalk.bold("NUMBERS ONLY.")))
    }
}
async function number1a() {
    const input = await inquirer.prompt({
        name: "number1t",
        type: 'input',
        default() {
            return '0';
        },
    }); 
    number1 = Number(input.number1t);
}
async function number2a() {
    const input = await inquirer.prompt({
        name: "number2t",
        type: 'input',
        default() {
            return '0';
        },
    }); 
    number2 = Number(input.number2t);
}
async function choicea() {
    const input = await inquirer.prompt({
        name: "choicet",
        type: 'input',
        default() {
            return '0';
        },
    }); 
    choice = input.choicet
}
async function sum(cb, x, y){
    let result = Number(x) + Number(y);
    cb(result)
}
async function multiply(cb, x, y){
    let result = Number(x) * Number(y);
    cb(result)
}
async function div(cb, x, y){
    if (x != 0 && y != 0){
        let result = Number(x) / Number(y);
        cb(result)
    } else
    {
        console.log(chalk.yellow("Do not tell me to do 0/0! It makes my brain hurt..."))
    }
}
async function subtract(cb, x, y){
    let result = Number(x) - Number(y);
    cb(result)
}

async function print(something){
    if (!isNaN(something)){
        console.log(chalk.bgCyanBright(something));
    } else {
        console.log(chalk.bgRed(chalk.bold(chalk.black("NUMBERS ONLY NEXT TIME."))))
    }
}

start()