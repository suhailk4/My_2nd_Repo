var mongoose=require('mongoose');
var date=new Date();

var time=date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();

var users=mongoose.model('users',{

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





module.exports={
 users
};
