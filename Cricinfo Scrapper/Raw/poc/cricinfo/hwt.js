let request=require("request");
let cheerio=require("cheerio");

// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cb);
//response is the superset of body
function cb(error,response,html){
    let cheerioSelector=cheerio.load(html);
    let tables=cheerioSelector(".table.bowler");
    //console.log(tables.length);
    //let bowlersHtmlString="";
    let hwname="";
    let hw=0;
    for(let i=0;i<tables.length;i++){
        //bowlersHtmlString+=cheerioSelector(tables[i]).text();
        //find function-> find an element inside an element
        let teamBowlers=cheerioSelector(tables[i]).find("tr");
        for(let j=0;j<teamBowlers.length;j++){
            //let bolHtml=cheerioSelector(teamBowlers[j]).text();
            let eachbowlcol=cheerioSelector(teamBowlers[j]).find("td");
            let playerName=cheerioSelector(eachbowlcol[0]).text(); //player name
            let wickets=cheerioSelector(eachbowlcol[4]).text(); //wickets
            console.log(playerName,"    ",wickets);
            if(hw<=Number(wickets)){
                hwname=playerName;
                hw=wickets;
            }
            //console.log(bolHtml);
            //tr-> name , wickets column
        }
        console.log("``````````````````````````````````````````````````````````");
    }
    console.log(hwname," takes ",hw," wickets");
    //console.log(bowlersHtmlString);
    //innings bowler table-> 2
    //get bowler name wickets
    //compare the wicket get the highest wicket taker

}
//Problem in this