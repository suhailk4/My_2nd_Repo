const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{

   if(err){

     console.log('Unable to Connect to MongoDB server',err);
   }

     console.log("Connected to Server");



const db=client.db('TodoApp');
db.collection('Users').find().count().then((count)=>{


   console.log("Todos");
   console.log(`Todo's Count : ${count}`);


},(err)=>{


console.log('Unable to Fetch records',err);

});



db.collection('Users').find({name : "Ahsan"}).toArray().then((docs)=>{


   console.log("Todos");
  console.log(JSON.stringify(docs,undefined,2));


},(err)=>{


console.log('Unable to Fetch records',err);

});


client.close();

});
