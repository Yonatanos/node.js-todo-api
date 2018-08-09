
(function() {
  "use strict";

  const mongoose = require('mongoose'); //For creating models
  const validator = require('validator'); //For validation of input
  const jwt = require('jsonwebtoken');
  const _ = require('lodash');

  let UserSchema = new mongoose.Schema({
    email: {
      type: String,
      minlength: 1,
      required: true,
      trim: true,
      unique: true,
      validate: {
        isAsync: false,
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
        }
      },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [{
      access: {
          type: String,
          required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  });

  UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
  };


  UserSchema.methods.generateAuthToken = function() { //for instance methods
    let user = this;
    let access = 'auth';

    let token = jwt.sign({_id: user._id.toHexString(), access},
                            'mySecretValue1234').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
      return token;
    })
  }

  let User = mongoose.model('User', UserSchema);

  module.exports = {User};


})();
