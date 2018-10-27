const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{

   if(err){

         console.log('Unable To Connect to MongoDB Server',err);
         return ;

   }
   console.log("Connected Successfully");

   const db=client.db('TodoApp');




db.collection('Users').findOneAndUpdate({_id: new ObjectID("5bd1a685ec847a1134978ab8")},
{
  $set:{
  location:"Habba Kadal ,Karfallii Mohalla"
}

},
{
   returnOriginal:false

}).then((result)=>{

console.log(result+"\n");


});


db.collection("Users").findOneAndUpdate(

  {

    _id: new ObjectID("5bd2ef87a8873d8edbef2434")

  },
  {
        $set:{

          name:"Salbiyah"
        },

        $inc:{

            age: 1

        }

  },
  {

   returnOriginal:false

 }).then((result)=>{


  console.log(result);

 });


client.close();

});
