// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Users').deleteMany({name: 'Yonatan'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({ _id: new ObjectID("5b5593afa1ec453069a8587b") }).then((result) => {
    console.log(result);
  });
  //delete many
  // db.collection('Todos').deleteMany({ text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne - delete only the first it finds
  // db.collection('Todos').deleteOne({ text: 'walk the dog'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
  //   console.log(result);
  // });
  //db.close();
});
