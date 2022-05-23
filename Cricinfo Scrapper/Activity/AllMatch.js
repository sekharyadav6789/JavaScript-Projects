//input->url
//outpur-> all url print
let request=require("request");
let cheerio=require("cheerio");
let scorecardObj=require("./scorecard.js");
//Function which gets the allmatches link and requests html page to extract score cards for each match
console.log("Inside All Match");
function processAllmatch(url){
    //request link extract
    request(url,cb);

    function cb(err,res,html){
        if(err){
            console.log(err);
        }
        else{
            extractAllScorecardLink(html);
        }
    }
}

//Function which takes html page as input and gives scorecard links
function extractAllScorecardLink(html){
    let selTool=cheerio.load(html);
    let scorecardlinkArr=selTool("a[data-hover='Scorecard']");
    for(let i=0;i<scorecardlinkArr.length;i++){
        let link=selTool(scorecardlinkArr[i]).attr("href");
        let fullLink="https://www.espncricinfo.com"+link;
        //console.log(fullLink);

        scorecardObj.processSingleMatch(fullLink); //Calling this function from scorecard.js to get the required data
    }
}

//This model gives processAllmatch function in the main.js
module.exports={
    pam: processAllmatch
}