/* eslint-disable no-console, no-unused-vars */
import React from 'react'
import axios from 'axios'
import SearchInput, { createFilter } from 'react-search-input'
import Edit from './Edit'
import Add from './Add'
import Delete from './Delete'
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
      console.log('get', books)
      this.setState({ books })
    })
  }
  handleInputChange(e) {
    this.setState({ searchTerm: e.target.value })
  }
  handleCreate(book) {
    axios.post(`http://localhost:3001/books`, book).then(res => {
      console.log('handleCreate post', res)
      this.getBooks()
    })
  }
  handleDelete(book) {
    /*axios.post(`http://localhost:3001/books`, book).then(res => {
      console.log('handleCreate post', res)
      this.getBooks()
    })*/
  }
  handleEdit(update) {
    console.log(update)

    axios
      .put(`http://localhost:3001/books/${update.id}`, {
        isbn: update.isbn,
        title: update.title,
        author: update.author,
        genre: update.genre,
        price: update.price,
      })
      .then(res => {
        console.log(1)
        if (res.status === 200) {
          console.log(2)
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
        <Add onCreate={this.handleCreate} />
        <Delete onDelete={this.handleDelete} />
        <form className="Search" onSubmit={this.submitHandler}>
          <h1>Search!</h1>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={this.handleInputChange}
          />
        </form>
        <ul>
          {filteredBooks.map(book => {
            return (
              <li key={book.id}>
                <p>ISBN: {book.isbn}</p>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Price: {book.price}</p>
                <Edit book={book} onEdit={this.handleEdit} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Search
