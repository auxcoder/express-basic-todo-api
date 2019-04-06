const app = require('../../server');
const assert = require('assert');
const request = require('supertest').agent(app.listen());
var chance = require('chance').Chance();
const userObj = {
  username: `test${chance.word({ length: 4 })}`,
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
// READ
describe('GET /users/<id>', () => {
  it('should create a new User', done => {
    request
      .get(`/api/users/${modelId}`)
      .expect(200)
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
// UPDATE
describe('PATCH /users/<id>', () => {
  it('should update a user record', done => {
    request
      .patch(`/api/users/${modelId}`)
      .send(Object.assign(userObj, { email: chance.email() }))
      .expect(200)
      .expect(res => {
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
    request
      .post('/api/users/login')
      .send(userObj)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.errors, false);
        assert.equal(res.body.errors, false);
      })
      .end(done);
  });
});
// DELETE
describe('DELETE /users/<id>', () => {
  it('should remove a user record', done => {
    request
      .delete(`/api/users/${modelId}`)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.errors, false);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should trow a 404', done => {
    request
      .delete(`/api/users/${modelId}`)
      .expect(500)
      .end(done);
  });
});
