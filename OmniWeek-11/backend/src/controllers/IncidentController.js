const knex = require('../database/connection');

class IncidentController {
  async index(req, res) {
    const {page = 1} = req.query;

    const [count] = await knex('incidents').count();

    console.log(count);

    const incidents = await knex('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
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

    return res.json(incidents);
  }

  async store(req, res) {
    const {title, description, value} = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await knex('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({id});
  }

  async delete(req, res) {
    
    const {id} = req.params;
    const ong_id = req.headers.authorization;

    const incident = await knex('incidents').where('id', id).select('*').first();
    console.log(incident);
    console.log(ong_id);

    if(incident.ong_id != ong_id) {
      return res.status(401).json({error: "Not authorized"})
    }

    await knex('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

module.exports = new IncidentController();