
const _=require('lodash');

const mongoose=require('mongoose');

const validator=require('validator');

const jwt=require('jsonwebtoken');


var UserSchema=new mongoose.Schema({

          email:{
             type:String,
             required:true,
             trim:true,
             minlength:5,
             unique:true,
             validate:{
                   validator:(value)=>{

                  return validator.isEmail(value);


                },
                message:"{VALUE} is not a valid Email"

             }



          },


        password:{
             type:String,
             required:true,
             minlength:6

        },

          tokens: [ {

                    access: {
                      type:String,
                      required:true

                    },

                    token:{
                         type:String,
                         required:true

                    }



               }
          ]


});


UserSchema.methods.generateAuthToken=function(){

 var user=this;
 var access="auth";
 var token=jwt.sign({id: user._id.toHexString(),access:access},'abc123').toString();
 user.tokens=user.tokens.concat([{access,token}]);
  return user.save().then(()=>{

         return token;

   });


};


UserSchema.methods.toJSON=function(){

         var user=this;
         var userobject=user.toObject();

         return _.pick(userobject,["_id","email"]);


};






var User=mongoose.model('User',UserSchema);
module.exports={

  User

};
