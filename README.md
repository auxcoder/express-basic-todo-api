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

## Logs

Logs gets writen to file from level `debug` and up in the `all-logs.log` files under **/logs** dir. Errors get logged too into `errors.log` files.
Related logic in `/core/logger`, using **[Winston](https://github.com/winstonjs/winston)**.

### Ref

#### Docs

- [BookshelfJS](https://bookshelfjs.org/api.html)
- [BookshelfJS 'registry' plugin](https://github.com)
- [KnexJS](https://knexjs.org/)
- [Sqlite](http://www.sqlitetutorial.net/)
- [WinstonJS](https://github.com/winstonjs/winston)
- [express-validator](https://github.com/express-validator/express-validator)
- [Validator](https://github.com/chriso/validator.js)

---

<!---
https://github.com/strongloop/loopback
--->
