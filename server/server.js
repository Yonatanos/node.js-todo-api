let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {ToDo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

//Add middlewear
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let toDo = new ToDo({
    text: req.body.text
  });

  toDo.save().then((document) => {
    res.send(document);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app};


// let newTodo = new toDo({
//   text: 'homework',
//   completed: false,
//   completedAt: ,
// });

// let newUser = new User({
//   email: "    yon@ma.com    ",
// });
//
// newUser.save().then((document) => {
//   console.log(JSON.stringify(document, undefined, 2));
// }, (e) => {
//   console.log(`Could'nt insert record. error message: ${e}` );
// });
//
// newTodo.save().then((document) => {
//   console.log('Saved document: ', JSON.stringify(document,undefined,2));
// }, (e) => {
//   console.log('Unable to save toDo. Error: ', e);
// });

// let Todo = mongoose.model('Todo', {
//   text: {
//     type: Boolean
//   },
//   completed: {
//     type: Boolean
//   },
//   completedAt: {
//     type: Number
//   }
// });
//
// let newTodo = new Todo({
//   text: 'Cool dinner'
// });
//
// newTodo.save().then((document) => {
//   console.log('Saved todo: ', document);
// }, (e) => {
//   console.log('Unable to save todo');
// });
