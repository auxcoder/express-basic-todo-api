# README

## Install

Create a Sqlite DB for development

```sh
$ sqlite3
sqlite> create table test.db
```

Install and run

```sh
$ npm install
$ npm start
```

## Running the application

[PM2](https://github.com/Unitech/PM2/)

---

## Running tests

Currently to make sure that your tests doesn’t listen “twice” from the `server.js` a check is done

```js
if (!module.parent) {
  app.listen(port);
}
```

Another options is using Nodemon, as a npm package script:

```js
"test": "nodemon --exec \"mocha --recursive\""
```

---

## JWT

[JSON Web Token Claims](https://www.iana.org/assignments/jwt/jwt.xhtml)

---

### Ref

#### Docs

- [BookshelfJS](https://bookshelfjs.org/api.html)
- [KnexJS](https://knexjs.org/)
- [Sqlite](http://www.sqlitetutorial.net/)
- [WinstonJS](https://github.com/winstonjs/winston)
- [express-validator](https://github.com/express-validator/express-validator)
- [Validator](https://github.com/chriso/validator.js)

- [Access Control Lists for Node](https://github.com/optimalbits/node_acl)
- [Using Jwt With Passport Authentication](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
- [Authentication In Spa](https://medium.com/@jcbaey/authentication-in-spa-reactjs-and-vuejs-the-right-way-e4a9ac5cd9a3)
- [Module Best Practices](https://github.com/mattdesl/module-best-practices)
- [Authentication PERN](https://github.com/danscratch/pern/blob/master/backend/src/db/user.js)

---

<!---
https://github.com/strongloop/loopback
--->
