(function() {
  "use strict";

  let env = process.env.NODE_ENV || 'development';

  if ('development' === env) {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
  } else if ('test' === env) {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
  }

})();
