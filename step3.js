const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOut(text, outp) {
    if (outp){
        fs.writeFile(outp, text, 'utf8', function(err){
            if (err){
                console.error(`Can not write ${outp}: ${err}`);
                process.exit(1);
            }
        })
    
    } else{
        console.log(text);
    }
}

function cat(path){
    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.error(`Error reading file ${path}: ${err}`);
            process.exit(1);
        }else {
            handleOut(data, outp);
        }
        
    });
}

async function webCat(url, outp){
    try{
        let response = await axios.get(url);
        handleOut(response.data, outp);
    } catch (err){
        console.error(`Error getting ${url}: ${err}`);
        process.exit(1);
    }
}
let path;
let outp;

if (process.argv[2]=== '--outp'){
    outp = process.argv[3];
    path = process.argv[4];
}else{
    path = process.argv[2];
}

if(path.slice(0, 4)=== 'http') {
    webCat(path, outp);
} else{
    cat(path, outp);
}