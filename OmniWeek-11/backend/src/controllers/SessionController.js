const knex = require('../database/connection');

class SessionController {
  async create(req, res) {
    const {id} = req.body;

    const ong = await knex('ongs').where('id', id).select('*').first();

    if(!ong) {
      return res.status(401).json({error: 'ONG not found!'});
    }

    return res.json(ong)

  }
}

module.exports = new SessionController();