
const PlayerRepository = require('../repositories/playerRepository.js');
class PlayerController {

    constructor(mysqlConnectionPool) {
      this.playerRepository = new PlayerRepository(mysqlConnectionPool);
    }

   getPlayers = async (req, res) => {
  
      try {
          const playerId = parseInt(req.params.id);
          
          if(typeof playerId !== 'number' || !Number.isInteger(playerId)) {
              return res.status(402).json({ error: 'wrong parameters' });
          }
          const player =  await this.playerRepository.getPlayerById(playerId);
          if(player === null  || player === undefined) {
              return res.status(404).json({ error: 'There is no player' });
          }
          res.send(player);
      } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

}

module.exports = PlayerController;