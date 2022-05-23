let request=require("request");
let cheerio=require("cheerio");

// https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cb);
//response is the superset of body
function cb(error,response,html){
    let cheerioSelector=cheerio.load(html);
    let tables=cheerioSelector(".table.batsman");
    //console.log(tables.length);
    //let batsmanHtmlString="";
    let hrunsname="";
    let hruns=0;
    for(let i=0;i<tables.length;i++){
        //batsmanHtmlString+=cheerioSelector(tables[i]).html();
        //find function-> find an element inside an element
        let teamBatsman=cheerioSelector(tables[i]).find("tr");
        for(let j=0;j<teamBatsman.length;j++){
            //let bolHtml=cheerioSelector(teamBowlers[j]).text();
            let eachbatsmancol=cheerioSelector(teamBatsman[j]).find("td");
            if(eachbatsmancol.length==8){
                let playerName=cheerioSelector(eachbatsmancol[0]).text(); //player name
                let runs=cheerioSelector(eachbatsmancol[2]).text(); //wickets
                console.log(playerName,"    ",runs);
                if(hruns<=Number(runs)){
                    hrunsname=playerName;
                    hruns=runs;
                }
            }
            //console.log(bolHtml);
            //tr-> name , wickets column
        }
        console.log("``````````````````````````````````````````````````````````");
        console.log(hrunsname," with runs ",hruns);
    }
    //console.log(batsmanHtmlString);
    //innings bowler table-> 2
    //get bowler name wickets
    //compare the wicket get the highest wicket taker

}
//Problem in this