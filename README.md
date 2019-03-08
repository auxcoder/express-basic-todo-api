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

### Ref

#### HTTP status codes

- **200**  OK, The request was successful
- **201**  CREATED, A new resource object was successfully created
- **404**  NOT FOUND, The requested resource could not be found
- **400** BAD REQUEST, The request was malformed or invalid
- **500**  INTERNAL SERVER ERROR, Unknown server error has occurred

#### Docs

- [BookshelfJS](https://bookshelfjs.org/api.html)
- [KnexJS](https://knexjs.org/)
- [Sqlite](http://www.sqlitetutorial.net/)

---
