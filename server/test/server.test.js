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
  text:"Second Todo Text",
  completed:false,
  completedAt:333

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




describe('Get Todos /Delete',()=>{

  var hexid=todos[1]._id.toHexString();
 it('Should delete Todo data',(done)=>{


      request(app)
      .delete(`/todos/${hexid}`)
      .expect(200)
      .expect((res)=>{

         expect(res.body.todo._id).toBe(hexid);
       })
    .end((err,res)=>{

             if(err)
             {
              return done(err);
             }
             Todo.findById(hexid).then((todo)=>{

            expect(todo).toNotExist();
            done();


          }).catch((e)=>{
            done(e);
          });

      });


    });


  it('Should Check If Id Doesnt exist',(done)=>{

              request(app)
              .delete(`/delete/todos/${hexid}`)
              .expect(404)
              .end(done);

  });


    it('Should Check If Id is InValid ',(done)=>{

                request(app)
                .delete('/delete/todos/12388')
                .expect(404)
                .end(done);


    });


 });











describe('Patch todos/:id',()=>{


    it('should test if text is changed ',(done)=>{

               var id=todos[0]._id.toHexString();
               var text="Hello Text is changed -1";
               request(app)
               .patch(`/todos/${id}`)
               .send({

                 text:text,
                 completed:true

               })
               .expect(200)
               .expect((res)=>{
                 expect(res.body.todo.text).toBe(text);
                 expect(res.body.todo.completed).toBe(true);
                 expect(res.body.todo.completedAt).toBeA('string')

               })
               .end(done);




    });
    it('should test 2nd todo text is changed, set completed to false and completed at Nully ',(done)=>{

               var id=todos[1]._id.toHexString();
               var text=" Text is changed -2";
               request(app)
               .patch(`/todos/${id}`)
               .send({

                 text:text,
                 completed:false,
                 completedAt:null

               })
               .expect(200)
               .expect((res)=>{
                 expect(res.body.todo.text).toBe(text);
                 expect(res.body.todo.completed).toBe(false);
                 expect(res.body.todo.completedAt).toNotExist();

               })
               .end(done);




    });







});
