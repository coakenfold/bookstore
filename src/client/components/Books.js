/* eslint-disable no-console, no-unused-vars */
import React from 'react'
import axios from 'axios'
import SearchInput, { createFilter } from 'react-search-input'

import TextField from '@material-ui/core/TextField'

import Create from './Create'
import BookAdmin from './BookAdmin'

const KEYS_TO_FILTERS = ['isbn', 'title', 'author', 'genre', 'price']

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      books: [],
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.getBooks = this.getBooks.bind(this)
  }
  getBooks() {
    axios.get(`http://localhost:3001/books`).then(res => {
      const books = res.data
      this.setState({ books })
    })
  }
  handleInputChange(e) {
    this.setState({ searchTerm: e.target.value })
  }
  handleCreate(book) {
    axios.post(`http://localhost:3001/books`, book).then(res => {
      this.getBooks()
    })
  }
  handleDelete(id) {
    console.log(111, id)
    axios.delete(`http://localhost:3001/books/${id}`).then(res => {
      this.getBooks()
    })
  }
  handleEdit(update) {
    axios
      .put(`http://localhost:3001/books/${update.id}`, {
        isbn: update.isbn,
        title: update.title,
        author: update.author,
        genre: update.genre,
        price: update.price,
      })
      .then(res => {
        if (res.status === 200) {
          this.getBooks()
        }
      })
  }
  submitHandler(e) {
    e.preventDefault()
  }
  componentDidMount() {
    this.getBooks()
  }
  render() {
    const filter = createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    const filteredBooks = this.state.books.filter(filter)
    return (
      <div>
        <h1 className="App__title">Book Club</h1>
        <form className="Search" onSubmit={this.submitHandler}>
          <TextField
            id="search"
            label="Search"
            margin="normal"
            onChange={this.handleInputChange}
          />
        </form>
        <ul className="books">
          {filteredBooks.map(book => {
            return (
              <li className="book" key={book.id}>
                <div className="book__data">
                  <p>ISBN: {book.isbn}</p>
                  <p>Title: {book.title}</p>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>Price: {book.price}</p>
                </div>
                <BookAdmin
                  book={book}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                />
              </li>
            )
          })}
        </ul>
        <Create onCreate={this.handleCreate} />
      </div>
    )
  }
}

module.exports = Search
