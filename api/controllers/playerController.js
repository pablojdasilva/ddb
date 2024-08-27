
const getPlayers = async (req, res) => {
 
    try {
        res.send('FALLEN!');
    } catch (error) {
      console.error('Error fetching unpaid jobs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    getPlayers
  };