(function() {
  "use strict";
  let mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  mongoose.connect(//"mongodb://<dbuser>:<dbpassword>@ds259111.mlab.com:59111/todo-app-api" ||
  process.env.PORT || "mongodb://127.0.0.1:27017/TodoApp");

  module.exports = {mongoose};


})();
