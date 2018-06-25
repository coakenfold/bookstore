/* eslint-disable no-console, no-unused-vars */
import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Typography from '@material-ui/core/Typography'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      isbn: '',
      title: '',
      author: '',
      genre: '',
      price: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleExpander = this.handleExpander.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  componentDidMount() {
    this.setState({
      isbn: this.props.book.isbn,
      title: this.props.book.title,
      author: this.props.book.author,
      genre: this.props.book.genre,
      price: this.props.book.price,
    })
  }
  handleExpander(e, expanded) {
    console.log(1, e, expanded)
    let newState = { expanded }
    if (expanded === false) {
      newState = {
        isbn: this.props.book.isbn,
        title: this.props.book.title,
        author: this.props.book.author,
        genre: this.props.book.genre,
        price: this.props.book.price,
      }
    }
    this.setState(newState)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleClick() {
    //this.setState({ expanded: true })
  }
  handleSubmit(e) {
    e.preventDefault()

    const { isbn, title, author, genre, price } = this.state
    this.props.onEdit({
      id: this.props.book.id,
      isbn,
      title,
      author,
      genre,
      price,
    })
  }
  handleCancel() {
    this.setState({
      expanded: false,
      isbn: this.props.book.isbn,
      title: this.props.book.title,
      author: this.props.book.author,
      genre: this.props.book.genre,
      price: this.props.book.price,
    })
  }

  render() {
    return (
      <div>
        <ExpansionPanel onChange={this.handleExpander}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Edit</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form onSubmit={this.handleSubmit}>
              <fieldset disabled={this.state.expanded ? undefined : true}>
                <FormGroup row>
                  <TextField
                    id={`edit-${this.props.book.id}-isbn`}
                    name="isbn"
                    label="ISBN"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.isbn}
                  />
                  <TextField
                    id={`edit-${this.props.book.id}-title`}
                    name="title"
                    label="Title"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.title}
                  />

                  <TextField
                    id={`edit-${this.props.book.id}-author`}
                    name="author"
                    label="Author"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.author}
                  />

                  <TextField
                    id={`edit-${this.props.book.id}-genre`}
                    name="genre"
                    label="Genre"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.genre}
                  />

                  <TextField
                    id={`edit-${this.props.book.id}-price`}
                    name="price"
                    label="Price"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.price}
                  />
                </FormGroup>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </fieldset>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

module.exports = Edit
