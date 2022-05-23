//player entry -> teamName
//player Name,
//a. Runs, balls, sixes, fours, sr for that match
//b. date, venue, result and opponent name for that match
//npm -> play store
let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
let xlsx = require("xlsx");

function processSingleMatch(url){
    request(url,cb);
}
function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        //console.log(html);
        extractPlayerDetails(html);
    }
}

function extractPlayerDetails(html){
    //date, venue
    let selTool=cheerio.load(html);
    let detailsElem=selTool(".match-header-info.match-info-MATCH .description");
    let detailText=detailsElem.text();
    //console.log(detailText);
    let deatilsArr=detailText.split(",");
    let venue=deatilsArr[1].trim();
    let date=deatilsArr[2].trim();
    //console.log(venue);
    //console.log(date);

    //match result
    let resultElem=selTool(".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text");
    let result=resultElem.text();
    //console.log(result);
    let NameofTeams=selTool(".Collapsible h5");
    let BatsmanTableofTeams=selTool(".Collapsible .table.batsman");
    for(let i=0;i<NameofTeams.length;i++){
        let allRowofCurrentTeam=selTool(BatsmanTableofTeams[i]).find("tbody tr");
        //console.log(allRowofCurrentTeam.text());
        for(let j=0;j<allRowofCurrentTeam.length;j++){
            let allcols=selTool(allRowofCurrentTeam[j]).find("td");
            if(allcols.length==8){
                //opponent team Name -> player -> team.team,
                //Runs, balls, sixes, fours, strike rate, name
                //date, venue, result
                //teamName
                let myTeamName=selTool(NameofTeams[i]).text().split("INNINGS")[0].trim();
                console.log(myTeamName);
                myTeamName=myTeamName.trim();
                let opponentTeamName= i==0? selTool(NameofTeams[1]).text() : selTool(NameofTeams[0]).text();
                opponentTeamName=opponentTeamName.split("INNINGS")[0].trim();
                let name=selTool(allcols[0]).text();
                let runs=selTool(allcols[2]).text();
                let balls=selTool(allcols[3]).text();
                let fours=selTool(allcols[5]).text();
                let sixes=selTool(allcols[6]).text();
                let sr=selTool(allcols[7]).text();
                console.log(`teamName ${myTeamName} playerName ${name} venue ${venue} Date ${date} 
                opponent ${opponentTeamName} result ${result} runs ${runs} balls ${balls} fours ${fours} 
                sixes ${sixes} sr ${sr}`);
                console.log("``````````````````````````````````````````````````````````");
                processPlayer(myTeamName, name, venue, date, opponentTeamName, result, runs, balls, fours, sixes, sr);
            }
        }
    }
}

function processPlayer(myTeamName, name, venue, date, opponentTeamName, result, runs, balls, fours, sixes, sr){
    //team folder-> exist
    let folderPath=path.join(__dirname,"ipl",myTeamName);
    dirCreater(folderPath);
    // //file-> read data and update ->write
    //create -> write
    //let filePath = path.join(folderPath, name + ".json");
    let filePath = path.join(folderPath, name + ".xlsx");
    
    //let content =[];
    let content = excelReader(filePath, name);
    let matchobj = {
        myTeamName, name, venue, date,
        opponentTeamName, result, runs, balls, fours, sixes, sr
    }

    content.push(matchobj);
    excelWriter(filePath, content, name);
    // if (fs.existsSync(filePath)) {
    //      let buffer = fs.readFileSync(filePath);
    //      content = JSON.parse(buffer);
    //  }
    // content.push(matchobj);
    // fs.writeFileSync(filePath, JSON.stringify(content));

}

function excelReader(filePath, name) {
    if (!fs.existsSync(filePath)) {
        return [];
    } else {
        let wb = xlsx.readFile(filePath);
        let excelData = wb.Sheets[name];
        let ans = xlsx.utils.sheet_to_json(excelData);
        return ans;
    }
}
function excelWriter(filePath, json, name) {
    // console.log(xlsx.readFile(filePath));
    let newWB = xlsx.utils.book_new();
   
    let newWS = xlsx.utils.json_to_sheet(json);
   
    xlsx.utils.book_append_sheet(newWB, newWS, name);
   
    xlsx.writeFile(newWB, filePath);
}


//Function to create player folder
function dirCreater(folderPath){
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath); //making folder at the folderpath given
    }
}
module.exports={
    processSingleMatch
}