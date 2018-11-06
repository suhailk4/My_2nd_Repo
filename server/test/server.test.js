const expect=require('expect');

const request=require('supertest');

const {app}=require('./../server3.js');

const {Todo}=require('./../models/todo.js');

const todos=[{
text:"First Todo Text"


},{

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
