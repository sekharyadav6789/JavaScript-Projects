let request = require("request");
let cheerio = require("cheerio");
function singlepageExtractor(url) {

    request(url, cb);
}
//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
//request(url, cb);

function cb(error, response, html) {
    let cheerioSelector = cheerio.load(html);
    //finding both the teams which played the match
    let bothMatches = cheerioSelector(".match-header .match-info.match-info-MATCH.match-info-MATCH .teams .team");
    //console.log(bothMatches.length);
    for (let i = 0; i < bothMatches.length; i++) {
        let isLossing = cheerioSelector(bothMatches[i]).hasClass("team-gray");
        if (isLossing == false) {
            //winning team name
            let myTeamElem = cheerioSelector(bothMatches[i]).find(".name");
            //console.log(myTeamElem.text());
            let myTeam = myTeamElem.text();
            let colInnings = cheerioSelector(".Collapsible");
            //team Name
            let bothInningsTeamName = cheerioSelector(".Collapsible .header-title.label");
            for (let j = 0; j < bothInningsTeamName.length; j++) {
                let teamName = cheerioSelector(bothInningsTeamName[j]).text();
                //console.log(teamName);
                let teamFirstName = teamName.split("INNINGS")[0]; //want first element after spliting
                teamFirstName = teamFirstName.trim(); //remove extra spaces from the input
                //console.log(teamFirstName);
                if (teamFirstName == myTeam) {
                    let winTeamInning = cheerioSelector(colInnings[j]);
                    console.log(myTeam);
                    printTeamStats(winTeamInning,cheerioSelector);
                    //console.log(winTeamInning);
                   /* let teamBatsman = cheerioSelector(tables[i]).find("tr");
                    for (let j = 0; j < teamBatsman.length; j++) {
                        //let bolHtml=cheerioSelector(teamBowlers[j]).text();
                        let eachbatsmancol = cheerioSelector(teamBatsman[j]).find("td");
                        if (eachbatsmancol.length == 8) {
                            let playerName = cheerioSelector(eachbatsmancol[0]).text(); //player name
                            let runs = cheerioSelector(eachbatsmancol[2]).text(); //wickets
                            console.log(playerName, "    ", runs);
                            if (hruns <= Number(runs)) {
                                hrunsname = playerName;
                                hruns = runs;
                            }
                        }
                    }*/
                }

                /*let InningsHtmlStr="";
                for(let j=0;j<bothInnings.length;j++){
                    InningsHtmlStr+=cheerioSelector(bothInnings[j]).html();
                    
                }
                console.log(InningsHtmlStr);*/

            }
        }
    }
}

function printTeamStats(winTeamInning,cheerioSelector){
    let statsArr=[];
    let allRows=cheerioSelector(winTeamInning).find(".table.batsman tbody tr");
    for(let j=0;j<allRows.length;j++){
        let eachbatcol=cheerioSelector(allRows[j]).find("td");
        if(eachbatcol.length==8){
            let playerName=cheerioSelector(eachbatcol[0]).text();
            let runs=cheerioSelector(eachbatcol[2]).text();
            statsArr.push({
                Name: playerName,
                Runs: runs
            })
        }
    }
    console.table(statsArr); //print the table
    console.log("``````````````````````````````````````````````");
}

module.exports={
    spFn:singlepageExtractor
}