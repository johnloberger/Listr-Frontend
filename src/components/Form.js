import React from 'react'
import { createListSuccess } from '../actions/list'
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'


class Form extends React.Component {
  state = { name: ''}


  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newList = {...this.state, user_id: this.props.auth.id}

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newList)
    }

    fetch('http://localhost:3001/api/v1/lists', reqObj)
    .then(resp => resp.json())
    .then(newList => {
      this.props.createListSuccess(newList)
      this.setState({
        name: ''
      })
    })


  }

  render(){
    return <div>
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.name} onChange={this.handleChange} />
        <input type='submit' value='add list'/>
      </form>
    </div>
  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  createListSuccess,
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
