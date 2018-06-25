import React from 'react'

import Edit from './Edit'
import Delete from './Delete'

class BookAdmin extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="book__admin">
        <Edit book={this.props.book} onEdit={this.props.onEdit} />
        <Delete
          isbn={this.props.book.isbn}
          id={this.props.book.id}
          onDelete={this.props.onDelete}
        />
      </div>
    )
  }
}

module.exports = BookAdmin
