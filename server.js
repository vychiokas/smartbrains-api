const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: '1',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users)
})

app.post('/signin', (req, res) =>{
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.email === database.users[0].email)
    console.log(req.body.password === database.users[0].password)
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success')
        } else {
            res.status(400).json('error logging in')
        }
    res.send('signing')
})


app.get('/profile/:id', (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
        if (!found){
            res.status(400).json("Not found")
        }
    })

})

app.put('/image', (req, res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
        if (!found){
            res.status(400).json("Not found")
        }
    })
})

app.post('/register', (req, res) =>{
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})