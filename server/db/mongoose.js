(function() {
  "use strict";
  let mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds259111.mlab.com:59111/todo-app-api");

  module.exports = {mongoose};


})();
