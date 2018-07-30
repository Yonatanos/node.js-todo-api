(function() {
  "use strict";
  const _ = require('lodash');
  let express = require('express');
  let bodyParser = require('body-parser');
  let {ObjectID} = require('mongodb');

  let {mongoose} = require('./db/mongoose');
  let {ToDo} = require('./models/todo');
  let {User} = require('./models/user');

  let app = express();
  const PORT = process.env.PORT || 3000;

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

  /* Get list of all todos */
  app.get('/todos',(request, response) => {
    ToDo.find().then((todos) => {
      response.send({todos});
    }, (e) => {
      response.status(400).send(e);
    });
  });


  /* Get a todo by Fetching id from user */
  app.get('/todos/:id', (request, response) => {
    let id = request.params.id;

    //ID validity check
    if (!ObjectID.isValid(id)) {
       return response.status(404).send();
    }

    ToDo.findById(id).then((todo) => {
      if (!todo) {
        return  response.status(404).send();
      }

      response.send({todo});
    }).catch((e) => response.status(400).send())
  });

  /* Delete a Todo by ID */
  app.delete('/todos/:id', (request, response) => {
    let id = request.params.id;
    //ID validity check
    if (!ObjectID.isValid(id)) {
      return response.status(404).send();
    }

    ToDo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return response.status(404).send();
      }

      response.send({todo});
    }).catch((e) => response.status(400).send());
  });

  /* Update a Todo by ID */
  app.patch('/todos/:id', (request, response) => {
    let id = request.params.id;
    //copy from the request body the 'text' and/or 'completed' fields if they exist
    let body = _.pick(request.body, ['text', 'completed', 'completedAt']);

    if (!ObjectID.isValid(id)) {
      return response.status(404).send();
    }

    if (body.hasOwnProperty('completedAt')) {
      return response.status(400).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    ToDo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
          if (!todo) {
            return result.status(404).send();
          }

          response.send({todo});
        }).catch((e) => {
          console.log('1', e);
          response.status(400).send();
        });
  });


  app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
  });

  module.exports = {app};


})(); //End of the code wrapping function (for strict mode)


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
