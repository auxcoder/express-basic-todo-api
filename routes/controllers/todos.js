const express = require('express');
const router = express.Router();
const Todos = require('../../db/models/todos');
const validateTodo = require('../middlewares/validateTodo');

// READ
router.route('/').get((req, res) => {
  Todos.fetchAll()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// CREATE
router.post('/', validateTodo, (req, res) => {
  Todos.forge({
    title: req.body.title,
    completed: req.body.completed
  })
    .save()
    .then(data => res.status(201).json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// READ
router.get('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Todos.where('id', req.params.id)
    .fetch()
    .then(data => {
      if (!data) {
        res.status(404).json({ errors: true, data: {} });
      } else {
        res.json({ errors: false, data: data });
      }
    })
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// UPDATE
router.patch('/:id([0-9]+)', validateTodo, (req, res) => {
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
        .then(() => res.json({ errors: false, data: { message: 'Quote updated' } }));
    })
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});
// DELETE
router.delete('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) console.error('quote ID is required');
  Todos.where('id', req.params.id)
    .destroy()
    .then(data => res.json({ errors: false, data: data }))
    .catch(err => res.status(500).json({ errors: [err.message], data: {} }));
});

module.exports = router;
