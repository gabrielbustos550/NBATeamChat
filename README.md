# NBATeamChat


## Come to the NBATeam Chat app in order to discuss you teams recent performance with other fans of you team. Join any team in the league's fanbase and immerse yourself in the conversation. 


daily sprints
wireframes
database ERDs
a RESTful routing chart for your app

## MVP Goals
1. Create a homepage that allows you to create an account
2. Once account is created, user can save favorite teams and players to their profile.
3. Use the api to acces last 10 game score results. 
4. Create routes for communities for each team 
5. Allow user to join team community in order to comment on last 3 games.




A concise list of feature goals you will need to attain to have a Minimum Viable Product.
## Stretch Goals
* Add individual player statistics app for user to be able to look up individual player stats.
* Add point system to comments, if comment reaches 100 points upload comment to twitter page. 



## User Stories
* As a user, I want to be able to create an account in order to save favorite team and join community. 
* As a user, I want to join team community in order to discuss last nights game. 
* As a user, I want to see if other fanatics agree with my analysis/comments.
* As a user, I want to see how my team has played over the last 10 games.


## balldontlie.io 
NBA related API that provides a wide variety of nba information from current team and players to historical NBA data. 

## NBA Stats
Api that downloads data from official NBA.com website to provide user with advanced stats for individual players. 


## URL	                    HTTP Verb	       Action
* /teams                      Get                Get list of all teams
* /players                    Get                Get list of all players
* /teams/id                   Get                Get favorited team name
* /players/id                 Get                Get favorited players
* /teams/id/community         Get                Get community of team
* /teams/id/community/        Post               Post comment to community page
* /teams/id/community/        DELETE             Delete comment from team page




