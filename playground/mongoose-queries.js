const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose.js');

const {Todo}=require('./../server/models/todo.js');

const {users}=require('./../server/models/user.js');

var id="5be131364bc394b02d89d4ac";
var id2="5bd9d90e5594d0ac2c3fa554";

// if(! ObjectID.isValid(id))
// {
// console.log(' Id is invalid');
//
// }




// Todo.find({
//   _id: id
//
// }).then((todos)=>{
//
//   console.log("\nTodos", todos);
// });
//
// Todo.findOne({
//
//   _id: id
// }).then((todo)=>{
//
//
//   console.log('\nTodo', todo);
// });

// Todo.findById(id).then((todo)=>{
//
//   if(!todo){
//   console.log('Id not Found');
// }
//     else{
//     console.log('Todo\n ',JSON.stringify(todo,undefined,2));
//   }
// }).catch((e)=>{
//
//   console.log(e)
//
// });



users.findById(id2).then((user)=>{
  if(!user){
 console.log('Id not found');
}
else{
console.log('users',user);
}
}).catch((err)=>{

  console.log(err);
});
