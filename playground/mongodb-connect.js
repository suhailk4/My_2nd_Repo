

// var obj=new ObjectID();
// console.log(obj.getTimestamp());


// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{

   if(err)
   {

    return  console.log('Unable to Connect to Database',err);
   }
   console.log('Connected to MongoDB server');

   // const db=client.db('TodoApp');
   // db.collection('Todos').insertOne({
   //
   //          text:"Something to do",
   //          completed: false
   //
   // },(err,results)=>{
   //          if(err){
   //            console.log('Unable to Insert a data',err);
   //            return ;
   //          }
   //      console.log(JSON.stringify(results.ops,undefined,5));
   //
   // });

const db=client.db('TodoApp');

db.collection('Users').insertOne({

   name:'Ahsan',
   age:24,
   localtion: 'Dalgate'

},(err,results)=>{

   if(err){

       console.log('Unable to Insert data',err);

   }

   console.log(JSON.stringify(results.ops,undefined,3));

});


         client.close();
});
