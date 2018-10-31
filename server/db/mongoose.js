var mongoose=require('mongoose');

mongoose.Promise=require('bluebird');

mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports={

  mongoose : mongoose
};
