let request=require("request");
let cheerio=require("cheerio");
let singlematchFileObj=require("./singleMatch.js");
// https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url,cb);

function cb(error,response,html){
    let cheerioSelector=cheerio.load(html);
    let matchcard=cheerioSelector(".col-md-8.col-16");
    //console.log(matchcard.length);
    for(let i=0;i<matchcard.length;i++){
        let allanchorsofAMatch=cheerioSelector(matchcard[i]).find(".match-cta-container .btn.btn-sm.btn-outline-dark.match-cta");
        let link=cheerioSelector(allanchorsofAMatch[2]).attr("href");
        //console.log(link);
        let fulllink="https://www.espncricinfo.com"+link;
        //console.log(fulllink);
        singlematchFileObj.spFn(fulllink);
    }
}