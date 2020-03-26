let mongoose = require('mongoose')

const server = 'localhost:27017'
const db = 'howtodoinjava'
const port = 270000
const user = ''
const password = ''

// mongoose.connect(`mongodb://${user}:${passwd}@${server}:${port}/${db}`, {'useNewUrlParser': true})
// mongoose.connect(`mongodb://${server}:${port}/${db}`, {'useNewUrlParser': true})
mongoose.connect(`mongodb://localhost:27017/howtodoinjava`)
mongoose.set('useCreateIndex', true);

let CustomerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Customer', CustomerSchema)