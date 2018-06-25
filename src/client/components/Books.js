/* eslint-disable no-console, no-unused-vars */
import React from 'react'
import axios from 'axios'

import SearchInput, { createFilter } from 'react-search-input'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Create from './Create'
import BookAdmin from './BookAdmin'

const KEYS_TO_FILTERS = ['isbn', 'title', 'author', 'genre', 'price']

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      books: [],
      loginUsername: '',
      loginPassword: '',
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.getBooks = this.getBooks.bind(this)
    this.submitLoginHandler = this.submitLoginHandler.bind(this)
    this.handleLoginInputChange = this.handleLoginInputChange.bind(this)
  }
  componentDidMount() {
    this.getBooks()
  }
  getBooks() {
    axios.get(`/books`).then(res => {
      const books = res.data
      this.setState({ books })
    })
  }
  handleInputChange(e) {
    this.setState({ searchTerm: e.target.value })
  }
  handleLoginInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleCreate(book) {
    axios.post(`/books`, book).then(res => {
      if (res.data.success) {
        this.getBooks()
      }
    })
  }
  handleDelete(id) {
    axios.delete(`/books/${id}`).then(res => {
      if (res.data.success) {
        this.getBooks()
      }
    })
  }
  handleEdit(update) {
    axios
      .put('/books/' + update.id, {
        isbn: update.isbn,
        title: update.title,
        author: update.author,
        genre: update.genre,
        price: update.price,
      })
      .then(res => {
        if (res.data.success) {
          this.getBooks()
        }
      })
  }
  submitLoginHandler(e) {
    e.preventDefault()
    axios
      .post(`/login`, {
        username: this.state.loginUsername,
        password: this.state.loginPassword,
      })
      .then(res => {
        console.log(res)
      })
  }
  submitHandler(e) {
    e.preventDefault()
  }
  render() {
    const filter = createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    const filteredBooks = this.state.books.filter(filter)
    return (
      <div>
        <h1 className="App__title">Book Club</h1>

        <form className="" method="post" onSubmit={this.submitLoginHandler}>
          <TextField
            id="loginUsername"
            name="loginUsername"
            label="Name"
            margin="normal"
            onChange={this.handleLoginInputChange}
            value={this.state.loginUsername}
          />
          <TextField
            id="loginPassword"
            name="loginPassword"
            label="Password"
            margin="normal"
            type="password"
            onChange={this.handleLoginInputChange}
            value={this.state.loginPassword}
          />

          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>

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
              <li className="book" key={book._id}>
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
