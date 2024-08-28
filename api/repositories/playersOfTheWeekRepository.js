class PlayersOfTheWeekRepository {
    constructor(mysqlConnectionPool) {
      this.mysqlConnectionPool = mysqlConnectionPool
    }
    
    async getPlayers(week, year){
     
      const startTransactionQuery = 'SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;';
      const query = `
      SELECT potw.Id, p.Id as PlayerId, p.Nickname , p.PictureUrl
        FROM ddb.PlayersOfTheWeek potw 
        LEFT JOIN \`ddb-admin\`.Player p ON potw.PlayerId = p.Id
        WHERE potw.Week = ? AND potw.\`Year\` = ?;
      `;
      const endTransactionQuery = 'SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;';
  

        try {
          const connection = await this.mysqlConnectionPool.getConnection();
          await connection.query(startTransactionQuery);
          const results = await connection.execute(query, [week, year]);
          await connection.query(endTransactionQuery);
          connection.release();
          return results[0].length > 0 ? results[0] : null;
        } catch (error) {
            console.error('Error trying to get teams of the week:', error);
            connection.release();
            throw error;
        }
    }
  }
  
  module.exports = PlayersOfTheWeekRepository;