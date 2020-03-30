const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  afterAll( async () => {
    await knex.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Africa Lives 2",
        email: "afriliv@alives.com",
        whatsapp: "1234567890",
        city: "Brasilia",
        uf: "DF"
      });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
})