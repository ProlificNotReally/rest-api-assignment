const express = require('express');
const crypto = require('crypto'); // Using this to generate uuid
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = []; //array to store users

//post method to add a new user with a unique id given a name and email
app.post('/users', (req, res) => {
    if(req.body.name == null || req.body.email == null){
        res.status(400).send({"error": "Missing name or email field"});
    }
    else{
        let id = crypto.randomUUID();
        let new_user = {"id": id, "name": req.body.name, "email": req.body.email}
        users.push(new_user);
        res.status(201).send({"id": id, "name": req.body.name, "email": req.body.email});
    }
});

//get method to retrieve a user information given their unique id
app.get('/users/:id', (req, res) => {
    let found_user = users.find(user => user.id === req.params.id);

    if(!found_user){
        res.status(404).send({"error": "User with given id not found"});
    }
    else{
        res.status(200).send(found_user);
    }
});

//update method to change a user's information given their unique id, new name and email
app.put('/users/:id', (req, res) => {
    if(req.body.name == null || req.body.email == null){
        res.status(400).send({"error": "Missing name or email field"});
    }

    let found_user_index = users.findIndex(user => user.id === req.params.id);

    if(found_user_index == -1){
        res.status(404).send({"error": "User with given id not found"});
    }
    else{
        users[found_user_index].name = req.body.name;
        users[found_user_index].email = req.body.email;
        res.status(200).send(users[found_user_index]);
    }
});

//delete method to delete a user with a given unique id
app.delete('/users/:id', (req, res) => {
    let found_user_index = users.findIndex(user => user.id === req.params.id);

    if(found_user_index == -1){
        res.status(404).send({"error": "User with given id not found"});  
    }
    else{
        users.splice(found_user_index, 1);
        res.status(204).end();
    }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing