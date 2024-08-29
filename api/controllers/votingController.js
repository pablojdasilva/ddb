const TeamsOfTheWeekRepository = require('../repositories/teamsOfTheWeekRepository.js');
const PlayersOfTheWeekRepository = require('../repositories/playersOfTheWeekRepository.js');
const { getWeek } = require('date-fns');

class VotingController {


  constructor(mysqlConnectionPool) {
    this.teamsOfTheWeekRepository = new TeamsOfTheWeekRepository(mysqlConnectionPool);
    this.playersOfTheWeekRepository = new PlayersOfTheWeekRepository(mysqlConnectionPool);
  }

  getTeams = async (req, res) => {
  
      try {

          const now = new Date();
          const week = getWeek(now);
          const year = now.getFullYear();
          
          const teams =  await this.teamsOfTheWeekRepository.getTeams(week, year);
          if(teams === null || teams.size === 0 || teams === undefined ) {
              return res.status(404).json({ error: 'There is no teams to vote' });
          }
          res.send(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    getPlayers = async (req, res) => {
  
      try {

          const now = new Date();
          const week = getWeek(now);
          const year = now.getFullYear();
          
          const players =  await this.playersOfTheWeekRepository.getPlayers(week, year);
          if(players === null || players.size === 0 || players === undefined) {
              return res.status(404).json({ error: 'There is no players to vote' });
          }
          res.send(players);
      } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

}
  module.exports = VotingController;
