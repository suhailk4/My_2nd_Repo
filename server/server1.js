const mongoose=require('mongoose');

mongoose.Promise=require('bluebird');
var date=new Date();
var time=date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();
mongoose.connect('mongodb://localhost:27017/TodoApp');

var otherTodo=mongoose.model('otherTodo',
{

     name:{

        type:String,
        required:true,
        minlength:2,
        trim:true
     },
     email:
     {
         type:String,
         required:true,
         minlength:5,
         trim:true

     },
     completed : {
       type:Boolean,
       default:false
     },
     completedAt:{

       type:String,
       default:time
     }



});




var myOtherTodo=otherTodo({
  name:"Adil",
  email:"   adil@gmail.com     ",
  completed:true,
  completedAt:time


});


myOtherTodo.save().then((docs)=>{

  console.log("Saved Todo App",docs);


},(err)=>{



  console.log("Unable to Save",err);
})
