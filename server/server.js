var mongoose=require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/TodoApp');

var today=new Date();

var myTodo =mongoose.model('myTodo',
{
   text:{

     type:String
   },
   completed:{

     type:Boolean
   },
   completedAt:
   {
          type:String
   }
});


var newTodo=new myTodo({

  text:"Started My Mongoose today",
  completed:true,
  completedAt:today.getHours() +":"+today.getMinutes() +":" + today.getSeconds()
});

newTodo.save().then((docs)=>{

console.log("Saved Todo",docs);

},(err)=>{

  if(err){

    console.log("Unable to Save Todo",err);
  }

});
