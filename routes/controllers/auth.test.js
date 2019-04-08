const app = require('../../server');
const assert = require('assert');
const jwt = require('jsonwebtoken');
var chance = require('chance').Chance();
const request = require('supertest').agent(app.listen());
const userObj = {
  username: `test${chance.word({ length: 4 })}`,
  email: chance.email(),
  password: `${chance.character({ casing: 'upper' })}${chance.word({ length: 5 })}${chance.natural({
    min: 1,
    max: 9,
  })}${chance.character({ symbols: true })}`,
};
let userId;
// REGISTER
describe('POST /register', () => {
  it('should register a new user', done => {
    request
      .post('/api/auth/register')
      .send(userObj)
      .expect(201)
      .expect(res => {
        userId = res.body.data.id;
        assert.equal(res.body.errors, false);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
// LOGIN
describe('POST /login', () => {
  it('should return a valid JWT', done => {
    const user = {
      email: 'kiubmen@gmail.com',
      password: 'password',
      ttl: 86400,
    };
    request
      .post('/api/auth/login')
      .send(user)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.errors, false);
        assert(typeof res.body.data.id == 'string');
        jwt.verify(res.body.data.id, 'secret', function(err, decoded) {
          assert(!err);
          assert.equal(decoded.email, user.email);
          assert.equal(decoded.sub, 'auth');
        });
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
// READ exist by email
describe('GET /auth/exist/<email>', () => {
  it('should find if email exist', done => {
    request
      .get(`/api/auth/exist/kiubmen@gmail.com`)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.errors, false);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('should have status 400, email not found', done => {
    request.get(`/api/auth/exist/xxx@gmail.com`).expect(404, done);
  });
});
