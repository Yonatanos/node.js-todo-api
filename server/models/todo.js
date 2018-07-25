let mongoose = require('mongoose');

let ToDo = mongoose.model('Todo', {
  text: {
    type: String,
    retuired: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {ToDo};
