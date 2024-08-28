class PlayerRepository {
    constructor(mysqlConnectionPool) {
      this.mysqlConnectionPool = mysqlConnectionPool
    }
    
    async getPlayerById(id){
     
      const startTransactionQuery = 'SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;';
      const query = "SELECT * FROM `ddb-admin`.Player WHERE id = ?";
      const endTransactionQuery = 'SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;';

        try {
          const connection = await this.mysqlConnectionPool.getConnection();
          await connection.query(startTransactionQuery);
          const result = await connection.execute(query, [id]);
          await connection.query(endTransactionQuery);
          connection.release();
          return result.length > 0 ? result[0][0] : null;
   
        } catch (error) {
            console.error('Error trying to get player:', error);
            connection.release();
            throw error;
        } 
    }
  }
  
  module.exports = PlayerRepository;