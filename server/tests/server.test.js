const EXPECT = require('expect');
const REQUEST = require('supertest');
const {ObjectID} = require('mongodb');

const APP = require('./../server').app;
const TODO = require('./../models/todo').ToDo;

const TODOS = [{
  _id: new ObjectID(),
  text: "Wake up"
}, {
  _id: new ObjectID(),
  text: "Organize room",
  completed: true,
  completedAt: 12345
}, {
  _id: new ObjectID(),
  text: "Team lunch"
}];

beforeEach((done) => {
  TODO.remove({}).then(() => {
    return TODO.insertMany(TODOS);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test ToDo text';

    REQUEST(APP)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((response) => {
      EXPECT(response.body.text).toBe(text);
    })
    .end((err, response) => {
      if (err) {
        return done(err);
      }

      TODO.find({text}).then((todos) => {
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
          EXPECT(todos.length).toBe(3);
          done();
        }).catch((e) => done(e));
      })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    REQUEST(APP)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      EXPECT(res.body.todos.length).toBe(3);
    })
    .end(done);
  });
});

describe('GET /todos/id', () => {
  it('should return todo doc', (done) => {
    REQUEST(APP)
    .get(`/todos/${TODOS[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      EXPECT(res.body.todo.text).toBe(TODOS[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    REQUEST(APP)
    .get(`/todos/${new ObjectID()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    REQUEST(APP)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/id', () => {
  it('should return a todo', (done) => {
    let hexId = TODOS[0]._id.toHexString();

    REQUEST(APP)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      EXPECT(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      //query database using findbyid toNotExist
      TODO.findById(hexId).then((todo) => {

        //expect null to not exist
        EXPECT(todo).toBeFalsy();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    REQUEST(APP)
    .delete(`/todos/${new ObjectID()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    REQUEST(APP)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    //grab id of the first item
    let hexId = TODOS[0]._id.toHexString();
    let text = "Patch it"

    REQUEST(APP)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: true
    })
    .expect(200)
    .expect((response) => {
      EXPECT(response.body.todo.text).toBe(text);
      EXPECT(response.body.todo.completed).toBe(true);
      EXPECT(typeof response.body.todo.completedAt).toBe('number');
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      done();
    });
  });

  it('should should clear completedAt when todo is not completed', (done) => {
    //grab id of the first item
    let hexId = TODOS[0]._id.toHexString();
    let text = "Patch it"

    REQUEST(APP)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: false
    })
    .expect(200)
    .expect((response) => {
      EXPECT(response.body.todo.text).toBe(text);
      EXPECT(response.body.todo.completed).toBe(false);
      EXPECT(response.body.todo.completedAt).toBeFalsy();
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      done();
    });
  });
});
