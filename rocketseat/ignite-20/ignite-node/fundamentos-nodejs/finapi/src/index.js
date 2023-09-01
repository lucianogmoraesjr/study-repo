const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

function verifiIfExistsAccountCpf(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({
      error: 'Customer not found.'
    });
  }

  request.customer = customer;

  return next();
};

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
};

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ 
      error: 'Customer already exists.'
    })
  }

  customers.push({
    cpf,
    name,
    id: uuid(),
    statement: [],
  });

  return response.sendStatus(201);
});

app.get('/statement', verifiIfExistsAccountCpf, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.get('/statement/date', verifiIfExistsAccountCpf, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(statement => {
    return statement.createdAt.toDateString() === new Date(dateFormat).toDateString();
  });

  return response.json(statement);
});

app.post('/deposit', verifiIfExistsAccountCpf, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return response.sendStatus(201);
});

app.post('/withdraw', verifiIfExistsAccountCpf, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error:  "Insufficient funds."})
  }

  const statementOperation = {
    amount,
    createdAt: new Date(),
    type: "debit",
  }

  customer.statement.push(statementOperation);

  return response.sendStatus(201);
});

app.put('/account', verifiIfExistsAccountCpf, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.sendStatus(201);
});

app.get('/account', verifiIfExistsAccountCpf, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete('/account', verifiIfExistsAccountCpf, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(204);
});

app.get('/balance', verifiIfExistsAccountCpf, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.status(200).json(balance);
});

app.listen(3333, () => console.log("🔥 Server running on http://localhost:3333"));