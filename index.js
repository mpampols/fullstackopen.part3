const http = require("http");
const express = require("express");
const { prependOnceListener } = require("process");
const app = express();

var morgan = require("morgan");

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("tiny"));

morgan(":method :url :status :res[content-length] - :response-time ms");

let persons = [
  {
    id: 1,
    name: "John",
    number: "111 111 111",
  },
  {
    id: 2,
    name: "Tony",
    number: "222 222 222",
  },
  {
    id: 3,
    name: "Joseph",
    number: "333 333 333",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/index", (request, response) => {
  const num_of_persons = persons.length;
  const request_date = new Date();
  response.send(`
    <p>Phonebook has info for ${num_of_persons} people</p>
    <p>${request_date}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(400).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  console.log(request.body);
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "Name or number are missing.",
    });
  }

  if (persons.find((person) => person.name === request.body.name)) {
    return response.status(400).json({
      error: "Person with the same name already exists. Name must be unique.",
    });
  }

  const person = {
    id: maxId + 1,
    name: request.body.name,
    number: request.body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
