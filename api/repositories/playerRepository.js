class PlayerRepository {
    constructor(connection) {
      this.connection = connection
    }
    
    async getPlayerById(id){
     
      const query = "SELECT * FROM `ddb-admin`.Player WHERE id = ?";

        try {
          const result = await this.connection.execute(query, [id]);
            if (result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error trying to get player:', error);
            throw error;
        }
    }
  }
  
  module.exports = PlayerRepository;