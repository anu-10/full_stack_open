require('dotenv').config()

const mongoose = require('mongoose')
const Person = require('./models/person')

const main = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')

  await mongoose.connect(uri)

  const [, , name, number] = process.argv

  if (!name) {
    const persons = await Person.find({})
    console.log('phonebook:')
    persons.forEach(({ name: personName, number: personNumber }) => {
      console.log(personName, personNumber)
    })
    return
  }

  if (!number) throw new Error('Provide both a name and a number')

  const person = await new Person({ name, number }).save()
  console.log(`added ${person.name} number ${person.number} to phonebook`)
}

main()
  .catch((error) => {
    console.error('Phonebook operation failed:', error.message)
    process.exitCode = 1
  })
  .finally(() => mongoose.connection.close())
