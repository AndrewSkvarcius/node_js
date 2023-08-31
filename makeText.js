/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


function generateText(txt){
    let mark  = new markov.MarkovMachine(txt);
    console.log(mark.makeTxt())
}

function makeTxt(path){
    fs.readFile(path, "utf8", function cb(err, data){
        if (err){
            console.log(`File not readable: ${path}: ${err}`);
            process.exit(1);
        } else{
            generateText(data);
        }
    })
}
async function makeUrlText(url){
    let response;
    try{
        response = await axios.get(url);

    } catch (err){
        console.error(`Error getting url: ${url}; ${err}`)
        process.exit(1);
    }
    generateText(response.data);
}
let [method , path] = process.argv.slice(2);
if (method === "file"){
 makeTxt(path);
}
else if (method === "url"){
    makeUrlText(path);
    }
else{
    console.error(`Unknown method: ${method}`)
    process.exit(1);
}    