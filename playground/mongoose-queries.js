const OBJECTID = require('mongodb').ObjectId;

const MONGOOSE = require('./../server/db/mongoose').mongoose;
const TODO = require('./../server/models/todo').ToDo;
const USER = require('./../server/models/user').User;

// let id =  '5b58bd6b1337283c2f56cd821111';
//
// if (!OBJECTID.isValid(id)) {
//   console.log('ID not valid');
// }

// TODO.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// TODO.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// TODO.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//
//   console.log('Todo by id: ', todo);
// }).catch((e) => console.log(e));
let userID = '5b56406557c426555954ff0';
USER.findById(userID).then((user) => {
  if (!user) {
    return console.log('Could not find user with ID ', userID);
  }

  console.log('User is: ', JSON.stringify(user, undefined, 2));
}, (e) => console.log(e));
