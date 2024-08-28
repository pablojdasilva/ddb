const TeamsOfTheWeekRepository = require('../repositories/teamsOfTheWeekRepository.js');
const PlayersOfTheWeekRepository = require('../repositories/playersOfTheWeekRepository.js');
const { getWeek } = require('date-fns');
let teamsOfTheWeekRepository;
let playersOfTheWeekRepository;


const initialize = (mysqlConnectionPool) => {
  teamsOfTheWeekRepository = new TeamsOfTheWeekRepository(mysqlConnectionPool);
  playersOfTheWeekRepository = new PlayersOfTheWeekRepository(mysqlConnectionPool);
};

const getTeams = async (req, res) => {
 
    try {

        const now = new Date();
        const week = getWeek(now);
        const year = now.getFullYear();
        
        const teams =  await teamsOfTheWeekRepository.getTeams(week, year);
        if(teams === null || teams.size === 0 ) {
            return res.status(404).json({ error: 'There is no teams to vote' });
        }
        res.send(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getPlayers = async (req, res) => {
 
    try {

        const now = new Date();
        const week = getWeek(now);
        const year = now.getFullYear();
        
        const players =  await playersOfTheWeekRepository.getPlayers(week, year);
        if(players === null || players.size === 0 ) {
            return res.status(404).json({ error: 'There is no players to vote' });
        }
        res.send(players);
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = {
    initialize,
    getTeams,
    getPlayers
  };