const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let numbers = [
    {
      name: "Arto Hellas",
      number: "112 4345",
      id: 1
    },
    {
      name: "Matti Luukkainen",
      number: "55557 88665",
      id: 2
    },
    {
      name: "Mikael Backman",
      number: "667 553",
      id: 3
    }
  ]  

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(numbers)
  })

  app.get('/api/person/:id', (req, res) => {
    const id = Number(req.params.id);
    const entry = numbers.find(p => p.id === id);

    if(entry)
      res.json(entry);
    else 
      res.status(404).end();
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name)
      return response.status(400).json({error: 'name missing'})

    if(!body.number)
      return response.status(400).json({error: 'number missing'})

    if(numbers.find(n => n.name === body.name))
      return response.status(400).json({error: 'name already exists'})

    const newId = Math.floor((Math.random() * 100000) + 1)
  
    const newNumber = {
      name: body.name,
      number: body.number,
      id: newId
    }

    numbers = numbers.concat(newNumber);
    response.json(newNumber)
  })

  app.delete('/api/person/:id', (req, res) => {
    const id = Number(req.params.id);
    const entry = numbers.find(p => p.id === id);
    const entryIndex = numbers.indexOf(entry);

    if(entry) {
      numbers.splice(entryIndex, 1);
      res.status(204).end();
    }
    else {
      res.status(404).end();
    }
      


  })

  app.get('/info', (req, res) => {
    const amount = numbers.length;
    res.send('<p>Puhelinluettelossa on ' + amount + ' henkilön tiedot' + '</p>')
  })

  // app.get('/notes/:id', (request, response) => {
  //   const id = Number(request.params.id)
  //   const note = notes.find(note => note.id === id)
  
  //   if ( note ) {
  //     response.json(note)
  //   } else {
  //     response.status(404).end()
  //   }
  // })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })