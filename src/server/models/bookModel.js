const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookModel = new Schema({
  isbn: String,
  title: String,
  author: String,
  genre: String,
  price: String,
})
module.exports = mongoose.model('books', bookModel)
