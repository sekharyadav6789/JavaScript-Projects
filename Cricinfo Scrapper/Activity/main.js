let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
let allMatchObj= require("./AllMatch.js");

let folderPath=path.join(__dirname,"ipl"); //__dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file. 
//console.log(folderPath);
dirCreater(folderPath); //To create a folder ipl

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        //console.log(html);
        extractAllMatchPageLink(html);
    }
}

function extractAllMatchPageLink(html){
    //Extract all matches link
    let selTool=cheerio.load(html);
    let nextPageAnchor=selTool(".widget-items.cta-link a");
    let link=nextPageAnchor.attr("href");
    let fullLink="https://www.espncricinfo.com"+link;
    //console.log(fullLink);
    allMatchObj.pam(fullLink); //calling the function from AllMatch.js to extract the scorecards link
}

//Function to create ipl folder
function dirCreater(folderPath){
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath); //making folder at the folderpath given
    }
}