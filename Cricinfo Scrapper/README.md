# # Project

# Introduction
The Internet is a data store of world's information. Be it text, media or data in any other format but most of the websites do not provide the option to save the data which they display to our local storage. So, This project helps you to stores the player's data which have played in the previous IPL from [cricinfo](https://www.espncricinfo.com/series/ipl-2020-21-1210595).

# Module Description
The project is divided into three modules.

1. Main module : In this module the cheerio loads the website page and returns the players data stored in their respective team's folder. The module takes website url as input. The module includes the synchronous calls of other modules.

2. Scorecard module: This module provides the scorecard links of every match which has been played in the IPL. The module takes link of every match as input. The module has been called by the main module.

3. Player module: This module provides excel file of each player having its performance stored in their respective team's folder. The module takes link of each scorecard provided by Scorecard module. This module is further divided into two sub modules.

    I. PlayerDetails: This function provides detais of match and players from the batsman table provided in the website.

    II. ProcessPlayer: This function takes all the details of the players and convert into excel file.

So, in this project we get the link of cricinfo website and it creates folder IPL then create subfolders of each team and in each team file it creates an excel file of each player having all the necessary details to analyze the data.

# Functionality of Application
In IPL 2021, around 400 crores has spent a large portion is used to form teams and auction of players so it is important to find out which player is the best fit for the team. This project can be used to find out the proper match of players for the team by providing each player's data that can be used by ML Algorithms to give a proper choices of players for the team. It makes the auction of team more accurate and reduces cost.

# Tools and Technologies Used
* [JavaScript](https://javascript.info/)
* [NodeJs](https://nodejs.org/api/fs.html)
* [Cheerio](https://www.npmjs.com/package/cheerio)

# Challenges
The main challenge here is the use of cheerio to load html pages and then extract the useful data from site. The other one is in converting the json obj to excel file. To solve both these problems I use [stackOverflow]("https://stackoverflow.com")

# Future Improvements
This project can be used to extract data that can be used by the ML algorithms to give predictions about the choice of players. The method of data analysis can be further added in the project

# Drawbacks
The project can be useful for static pages and the pages that have less secure. More secure and dynamic site such as Facebook, Instagram etc. cannot be extracted by this project.
