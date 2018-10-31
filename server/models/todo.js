var mongoose=require('mongoose');

var date=new Date();
var time=date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();


var Todo=mongoose.model('Todo', {

   text:{

        type:String,
        required:true,
        minlength:1,
        trim:true
   },

   completed:{
      type:Boolean,
      defualt:false

   },

   completedAt:{
     type:String,
     default:time

   }


});


module.exports={

  Todo
}
