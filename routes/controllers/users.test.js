const app = require('../../server');
const assert = require('assert');
const request = require('supertest').agent(app.listen());
var chance = require('chance').Chance();

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
