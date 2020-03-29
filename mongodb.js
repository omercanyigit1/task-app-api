//crud = create read update delete

const {MongoClient, ObjectID} = require('mongodb');
//const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

const id = new ObjectID();

console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {

    if (error) {
        return console.log('unable to connect database');
    }

    console.log('Connected correctly!');

    const db = client.db(databaseName);

    /** db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    }, (error, result) => {
        if(error) {
            return console.log('unable to insert user');
        }

        console.log(result.ops)
    });

    db.collection('users').insertMany(
        [
            {
                name: 'John',
                age: 27
            },
            {
                name: 'Omer',
                age: 27
            }],
        (error, result) => {
            if (error) {
                return console.log('unable to insert user');
            }

            //console.log(result.ops)
        });

    db.collection('tasks').insertMany(
        [
            {
                description: 'lorem ipsum',
                completed: true
            },
            {
                description: 'do homework',
                completed: false
            }],
        (error, result) => {
            if (error) {
                return console.log('unable to insert task');
            }

            // console.log(result.ops)
        }); **/
});
