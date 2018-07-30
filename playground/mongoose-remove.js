const OBJECTID = require('mongodb').ObjectId;

const MONGOOSE = require('./../server/db/mongoose').mongoose;
const TODO = require('./../server/models/todo').ToDo;
const USER = require('./../server/models/user').User;

//Remove all
//TODO.remove({}).then((result) => console.log(result));

//Find one and Remove
TODO.findOneAndRemove({
  text: "third attempt"
}).then((todo) => {
  console.log(todo);
});

//Find  by ID and remove
TODO.findByIdAndRemove("5b5f01e051a6d34a8a157b0d")
    .then((todo => console.log(todo)));
