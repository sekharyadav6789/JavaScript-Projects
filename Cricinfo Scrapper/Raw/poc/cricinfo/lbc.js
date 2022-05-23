let request=require("request");
let cheerio=require("cheerio");
//input -> commentary page url
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(url,cb);
//initial content -> scrap
//last ball commentary
//first ball commentary
//automation -> browser
function cb(error,response,html){
    
    let cheerioSelector=cheerio.load(html);
    let element=cheerioSelector(".col-14.col-md-15.col-lg-14 .match-comment-long-text");
    //multiple matching-> all first
    //comsole.log(element.length);
    //console.log(element.html());
    let lbtext=cheerioSelector(element[0]).text(); //finding nth element in array of commentary extracted by cheerio
    console.log(lbtext); //last ball commentary
}