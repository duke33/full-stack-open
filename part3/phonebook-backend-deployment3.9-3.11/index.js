const express = require("express");
const app = express();
const port = 3010;
var bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')


let persons = [{
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];




app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('build'))

morgan.token('type', function(req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))




app.get("/", (req, res) => {
    res.send("Hello!!!!!");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {

    res.send(`<p>Phonebook has info for: ${persons.length} people</p>\n ${new Date(Date.now())}`);
});



app.get("/banana", (req, res) => {
    res.status(400).send('Current password does not match');
});


app.get("/api/persons/:id", (req, res) => {

    const id = Number(req.params.id)
    const foundPerson = persons.find(person => person.id === id)
    if (foundPerson) {
        res.send(foundPerson)
    } else(res.status(404).end())

});


app.delete("/api/persons/:id", (req, res) => {



    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.send(persons)

});


app.post("/api/persons", (req, res) => {

    let newPerson = {
        id: Math.floor(Math.random() * 6000),
        name: req.body.name,
        number: req.body.number
    }
    if (!(newPerson.name)) {
        console.log('Entro al Name is missing');
        res.statusMessage = 'Name is Missing';
        res.status(400).end()


    } else if ((persons.some(element => element.name === newPerson.name))) {
        console.log('Entro al nombre repetido');
        res.send({ error: 'name must be unique' })


    } else if (!(newPerson.number)) {
        console.log('Entro al number is missing');
        res.send({ error: 'Number is Missing' })
            // res.status(204).send('Current password does not match');

    } else {
        console.log('Entro a crear una persona nueva');
        persons = persons.concat(newPerson)
        res.send(persons)


    }
})


const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})