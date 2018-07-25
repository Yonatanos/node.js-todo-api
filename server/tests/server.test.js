const EXPECT = require('expect');
const REQUEST = require('supertest');

const APP = require('./../server').app;
const TODO = require('./../models/todo').ToDo;

beforeEach((done) => {
  TODO.remove({}).then(() => done());
});
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test ToDo text';
    REQUEST(APP)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((response) => {
      EXPECT(response.body.text).toEqual(text);
    })
    .end((err, response) => {
      if (err) {
        return done(err);
      }

      TODO.find().then((todos) => {
        EXPECT(todos.length).toBe(1);
        EXPECT(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    })
  });

  it('should not create todo with invalid body data', (done) => {
    REQUEST(APP)
      .post('/todos')
      .send({text: "   "})
      .expect(400)
      .expect((response) => {
        EXPECT(response.body.text).toBe(undefined);
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        TODO.find().then((todos) => {
          EXPECT(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      })
  });
});
