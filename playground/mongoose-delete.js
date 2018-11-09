const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose.js');

const {Todo}=require('./../server/models/todo.js');

const {users}=require('./../server/models/user.js');

Todo.remove({}).then((result)=>{


  console.log(result);



});
