class TeamsOfTheWeekRepository {
    constructor(mysqlConnectionPool) {
      this.mysqlConnectionPool = mysqlConnectionPool
    }
    
    async getTeams(week, year){
     
      const startTransactionQuery = 'SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;';
      const query = `
        SELECT totw.Id, t.Id, t.Name, t.LogoUrl
        FROM ddb.TeamsOfTheWeek totw
        LEFT JOIN \`ddb-admin\`.Team t ON totw.TeamId = t.Id
        WHERE totw.Week = ? AND totw.\`Year\` = ?;
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
  
  module.exports = TeamsOfTheWeekRepository;