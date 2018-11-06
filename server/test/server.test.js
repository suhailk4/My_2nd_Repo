const expect=require('expect');

const request=require('supertest');

const {app}=require('./../server3.js');

const {Todo}=require('./../models/todo.js');

const {ObjectID}=require('mongodb');

const todos=[{
_id :new ObjectID(),
text:"First Todo Text"


},
{
  _id :new ObjectID(),
  text:"Second Todo Text"

}];

  beforeEach((done)=>{

     Todo.remove({}).then(()=> {

             return Todo.insertMany(todos);


     }).then(()=>{

       done();
     });

  });



describe('Post /todos',()=>{


  it('Should create a new Todo ',(done)=>{


        var text = 'Test todo text';

           request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
            expect(res.body.text).toBe(text);
          })


     .end((err,res)=>{

          if(err){


            return done(err);
              }


          Todo.find({text}).then((todos)=>{

              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();


          }).catch((err)=>{


            done(err);

        });

    });

});






   it('should not create todo with invalid body data', (done) => {

          request(app)
           .post('/todos')
            .send({})
           .expect(400)
           .end((err, res) => {
             if (err) {
               return done(err);
             }



                   Todo.find().then((todos)=>{


                      expect(todos.length).toBe(2);
                      done();


                   }).catch((err)=>{


                     done(err);
                   });

       });

   });

});


 describe('Get /todos',()=>{



  it('Should check Test Todos',(done)=>{

         request(app)
         .get('/todos')
         .expect(200)
         .expect((res)=>{

           expect(res.body.todos.length).toBe(2);
         })
         .end(done);







  });


 });


describe('Get/todos/:id',()=>{


     it('Should test get todos if id found',(done)=>{




          request(app)
          .get(`/todos/${todos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res)=>{


            expect(res.body.todo.text).toBe(todos[0].text);
          })

          .end(done);



     });

     it('should test get todos if  valid object id but not found',(done)=>{


        var id2=new ObjectID().toHexString();
           request(app)
           .get('/todos/id')
           .expect(404)
           .end(done);


     });




     it('should test get todos if  Invalid object id',(done)=>{



           request(app)
           .get('/todos/abc334')
           .expect(404)
           .end(done);


     });

});
