var {mongoose}=require("./db/mongoose.js");

var bodyparser=require('body-parser');

var {Todo}=require("./models/todo.js");

var {users}=require('./models/user.js');

const express=require('express');

var app=express();

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






app.listen(3000,()=>{

 console.log('Server is running on Port 3000');

});



module.exports={

  app
};
