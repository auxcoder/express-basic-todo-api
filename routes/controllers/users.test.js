const app = require('../../server');
const assert = require('assert');
const request = require('supertest').agent(app.listen());
var chance = require('chance').Chance();
const userObj = {
  username: chance.word({ length: 8 }),
  email: chance.email(),
  password: `${chance.character({ casing: 'upper' })}${chance.word({ length: 5 })}${chance.natural({
    min: 1,
    max: 9,
  })}${chance.character({ symbols: true })}`,
};
let modelId;
// READ all/paginate
describe('GET /users', () => {
  it('should get all users records', done => {
    request
      .get('/api/users')
      // by default
      // .set('Accept', 'application/json')
      .expect(200)
      .expect(res => {
        assert.equal(res.body.errors, false);
        assert.equal(res.body.data.length > 0, true);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
// CREATE
describe('POST /users', () => {
  it('should create a new User', done => {
    request
      .post('/api/users')
      .send(userObj)
      .expect(201)
      .expect(res => {
        modelId = res.body.data.id;
        assert.equal(res.body.errors, false);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
