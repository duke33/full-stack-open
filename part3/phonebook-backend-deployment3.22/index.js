const express = require("express");
const app = express();
const port = 3010;
var bodyParser = require("body-parser");
var morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("build"));

morgan.token("type", function (req) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.get("/", (req, res) => {
  res.send("Hello!!!!!");
});

app.get("/api/persons", (req, res) => {
  console.log("a ver si hay id", req.params.id);
  console.log("esta entrando a esta ruta /api/persons y no se por que");
  Person.find({}).then((persons) => {
    console.log("y tambien al metodo find");
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
      if (person) {
        res.json(person);
      } else {
        console.log("deberia lelgar al 404");
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.countDocuments().then((response) => {
    console.log("counted docs", response);
    res.send(
      `<p>Phonebook has info for: ${response} people</p>\n ${new Date(
        Date.now()
      )}`
    );
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  console.log("esta entrando al delete");
  console.log("req.params.id:: ", req.params.id); //TODO esto llega vacio!!! Probablemente porque no se esta actualizando en el boton de delete
  Person.findByIdAndDelete(req.params.id)
    .then((personDeleted) => {
      console.log("person deleted", personDeleted);
      res.json(personDeleted);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  console.log("este es el body del PUT", req.body);
  console.log("este es elid que pasa PUT", req.params.id);

  Person.findByIdAndUpdate(req.params.id, { number: req.body.number })
    .then((personUpdated) => {
      res.json(personUpdated);
    })
    .catch((error) => next(error));
});

//add new person
app.post("/api/persons", (req, res, next) => {
  let newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      console.log("savedPerson: ", savedPerson);
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

//unknown endpoint
app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

//errorHandler
app.use((error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    console.log("ENTRA AL ERROR");
    return res.status(400).json({ error: error.message });
  }

  next(error);
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
