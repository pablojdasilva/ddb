const PlayerRepository = require('../repositories/playerRepository.js');
let playerRepository;


const initialize = (connection) => {
    playerRepository = new PlayerRepository(connection);
};

const getPlayers = async (req, res) => {
 
    try {
        const playerId = parseInt(req.params.id);
        
        if(typeof playerId !== 'number' || !Number.isInteger(playerId)) {
            return res.status(402).json({ error: 'wrong parameters' });
        }
        const player =  await playerRepository.getPlayerById(playerId);
        if(player === null ) {
            return res.status(404).json({ error: 'There is no player' });
        }
        res.send(player);
    } catch (error) {
      console.error('Error fetching player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    initialize,
    getPlayers
  };