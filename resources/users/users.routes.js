const express = require('express')
const uuidv4 = require('uuid/v4');


const validateUser = require('./users.validate');

let users = require('../../db').users;

const usersRoutes = express.Router()

usersRoutes.get('/', (req, res) => {
  res.json(users);
});

usersRoutes.post('/', validateUser, (req, res) => {
  const newUser = { ...req.body, id: uuidv4() };
  users.push(newUser);
  res.json(newUser);
})

///users/098as908asd098asd089
usersRoutes.put('/:id', (req, res) => {
  const filterUser = users.filter(user => user.id === req.params.id)[0];

  const updatedUser = { ...filterUser, ...req.body  };

  res.json(updatedUser);
})

// DESTROY

usersRoutes.delete('/:id', (req, res) => {
  const filterUser = users.filter(user => user.id === req.params.id)[0];

  const usersWithoutSelected = users.filter(user => user.id !== req.params.id)[0];

  users = usersWithoutSelected;

  res.json(users);
});


module.exports = usersRoutes;
