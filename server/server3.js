
const _=require('lodash');

var {mongoose}=require("./db/mongoose.js");

var bodyparser=require('body-parser');

var {Todo}=require("./models/todo.js");

var {users}=require('./models/user.js');

const {ObjectID} =require('mongodb');


const express=require('express');

var app=express();

const port=process.env.PORT|| 3000;

app.use(bodyparser.json());




app.post('/todos',(req,res)=>{

   var todo=new Todo({

     text: req.body.text
   });

   todo.save().then((docs)=>{


   res.send(docs);


 },(err)=>{


    res.status(400).send(err);
 });

     console.log(req.body);

});






//
// app.post('/user',(req,res)=>{
//
//         var user=new users({
//
//               name: req.body.name,
//               email: req.body.email
//
//
//         });
//
//         user.save().then((doc)=>{
//
//
//           res.send(doc);
//         },(err)=>{
//
//
//         res.status(400).send();
//         });
//
//
//
//
// });

app.get('/todos',(req,res)=>{


       Todo.find().then((todos)=>{

          res.send({todos});


       },(err)=>{

         res.status(400).send(err);
       });








});





app.get('/todos/:id',(req,res)=>{

  var id=req.params.id;

          if(!ObjectID.isValid(id))
          {

            return res.status(404).send();
          }

          Todo.findById(id).then((todo)=>{

                     if(!todo)
                     {
                       return res.status(404).send();
                     }


                     res.send({todo});



          }).catch((e)=>{

             res.status(400).send();
          });





});

app.delete('/todos/:id',(req,res)=>{


  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{

       if(!todo){
         return res.status(404).send();
       }
       res.status(200).send({todo});
    }).catch((e)=>{
      res.status(400).send()
    });



  });



app.patch('/todos/:id',(req,res)=>{


   var id=req.params.id;

   var body=_.pick(req.body,["text","completed"]);

   if(!ObjectID.isValid(id))
   {
     return res.status(404).send();
   }
   if(_.isBoolean(body.completed) && body.completed)
{

 body.completedAt=new Date().getTime();


}
else{

  body.completed=false;
  body.completedAt=null;
}


   Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{

         if(!todo)
         {
           return res.status(404).send();
         }

        res.send({todo});




   }).catch((e)=>{
     res.status(400).send();
   })





});

















app.listen(port,()=>{

 console.log(`Server is running on Port ${port}`);

});



module.exports={

  app
};
