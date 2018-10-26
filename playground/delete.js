const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{

   if(err){

         console.log('Unable To connect to MongoDB Server',err);
         return ;

   }
   console.log("Connected Successfully");

   const db=client.db('TodoApp');


//delete one record
   // db.collection('Users').deleteOne({name:'Naveed'}).then((result)=>{
   //
   //
   //     console.log(result);
   //
   //
   // });

   //findOneAndDelete .. Returns Object(record) which was deleted
   //
   // db.collection('Users').findOneAndDelete( {name:'Ahsan'} ).then((result)=>{
   //
   //
   // console.log(JSON.stringify(result,undefined,2));
   //
   // });

   //deleteMany
   db.collection("Users").deleteMany({name:'Ahsan'}).then((result)=>{



   console.log("Many Records To Be Deleted\n");

   console.log(result);

   });





});
