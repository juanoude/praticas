const knex = require('../database/connection');

class ProfileController {
  async index(req, res) {
    const {page = 1} = req.query;
    const id = req.headers.authorization;

    const [count] = await knex('incidents')
      .where('ong_id', id)
      .count();

    const ongIncidents = await knex('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .where('ong_id', id)
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(ongIncidents);
  }
}

module.exports = new ProfileController();