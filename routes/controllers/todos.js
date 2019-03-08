var express = require('express');
const router = express.Router();
const Todos = require('../../db/models/todos');
// READ
router.route('/').get((req, res) => {
  Todos.fetchAll().then(function(data) {
    res.json({ error: false, data: data });
  });
});
// CREATE
router.post('/', (req, res) => {
  Todos.forge({
    title: req.body.title,
    completed: req.body.completed
  })
    .save()
    .then(data => {
      res.status(201).json({ error: false, data: data });
    })
    .catch(err => {
      res.status(500).json({ error: true, data: { message: err.message } });
    });
});
// READ
router.get('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Todos.where('id', req.params.id)
    .fetch()
    .then(data => {
      if (!data) {
        res.status(404).json({ error: true, data: {} });
      } else {
        res.json({ error: false, data: data });
      }
    })
    .catch(err => {
      res.status(500).json({ error: true, data: { message: err.message } });
    });
});
// UPDATE
router.patch('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Todos.forge('id', req.params.id)
    .fetch({ require: true })
    .then(todo => {
      todo
        .save({
          title: req.body.title || todo.title,
          completed: req.body.completed || todo.completed,
          updated_at: new Date().toISOString()
        })
        .then(() => res.json({ error: false, data: { message: 'Quote updated' } }));
    })
    .catch(err => res.status(500).json({ error: true, data: { message: err.message } }));
});
// DELETE
router.delete('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Todos.where('id', req.params.id)
    .destroy()
    .then(data => res.json({ error: false, data: data }))
    .catch(err => res.status(500).json({ error: true, data: { message: err.message } }));
});

module.exports = router;
