//npm -> playstore
let request=require("request");
let cheerio=require("cheerio");
//console.log("Before");
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results
request("https://www.google.com/",cb);
//response is the superset of body
function cb(error,response,html){
    //console.log(response);
    //console.log(html);
    let cheerioSelector=cheerio.load(html);
    let element=cheerioSelector("#SIvCob");
    //console.log(element.html());
    console.log(element.text());
}
console.log("After");