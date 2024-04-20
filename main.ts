#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const apiLink: string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"

let fetchData = async ( data:string ) => {
    let fetchQuiz : any = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};



let startQuiz = async () => {
    let data = await fetchData(apiLink)
    let score: number = 0
    // for user name
    let name = await inquirer.prompt(
        {
            name : "fname",
            type : "input",
            message : "Entre Your Name: ",
        }
);
    for (let i=1 ; i< data.length ; i++){
        let answers = [...data[i].incorrect_answers,data[i].correct_answer]

        let ans = await inquirer.prompt(
            {
                name : "quiz",
                type : "list",
                message : data[i].question,
                choices : answers.map((val:any)=>val),
            }
);
        if (ans.quiz == data[i].correct_answer){
            ++score
        }
    };
    console.log(`Dear ${chalk.green.bold(name.fname)} your Score is ${score}`);
    
};

startQuiz();

