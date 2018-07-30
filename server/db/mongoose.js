(function() {
  "use strict";
  let mongoose = require('mongoose');

  mongoose.Promise = global.Promise;

  let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
  //Set as enviroenment variable  mlab: 'mongodb://public:public1234@ds259111.mlab.com:59111/todo-app-api'
  };

  mongoose.connect(prcoess.env.MONGOB_URI || db.mlab);

  module.exports = {mongoose};


})();
