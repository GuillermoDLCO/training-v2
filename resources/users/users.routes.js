const express = require('express')
const uuidv4 = require('uuid/v4');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const validateUser = require('./users.validate');

let users = require('../../db').users;

const usersRoutes = express.Router()

usersRoutes.get('/', (req, res) => {
  res.json(users);
});


// Anterior metodo post con diferente estructura de ysers
// usersRoutes.post('/', validateUser, (req, res) => {
//   const newUser = { ...req.body, id: uuidv4() };
//   users.push(newUser);
//   res.json(newUser);
// })

usersRoutes.post('/', (req, res) => {
  const hp = bcrypt.hashSync(req.body.password, 10)

  const newUser = { ...req.body, id: uuidv4(), password: hp };

  users.push(newUser);
  res.json(newUser);
})

///users/098as908asd098asd089
usersRoutes.put('/:id', (req, res) => {
  const filterUser = users.filter(user => user.id === req.params.id)[0];
  if (filterUser == null){
    return res.status(403).send('Usuario no existe.') 
  }
  const updatedUser = { ...filterUser, ...req.body  };

  res.json(updatedUser);
})

// DESTROY

usersRoutes.delete('/:id', (req, res) => {
  const filterUser = users.filter(user => user.id === req.params.id)[0];
  if (filterUser == null){
    return res.status(403).send('Usuario no existe.') 
  }
  const usersWithoutSelected = users.filter(user => user.id !== req.params.id);

  users = usersWithoutSelected;

  res.json(users);
});

usersRoutes.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.filter(user => user.username === username)[0]

  const isAuthenticated = bcrypt.compareSync(password, user.password);

  if (isAuthenticated) {
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '10h' })

    res.json({ token })
  } else {
    res.status(401).send('Verifica tu password');
  }
})

module.exports = usersRoutes;
