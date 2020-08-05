import React from 'react'
import { createTaskSuccess } from '../actions/task'
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'


class TaskForm extends React.Component {
  state = { text: ''}


  handleChange = (e) => {
    console.log(this.props)
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {...this.state, list_id: this.props.id, is_completed: false}

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }

    fetch('http://localhost:3001/api/v1/tasks', reqObj)
    .then(resp => resp.json())
    .then(newTask => {
      this.props.createTaskSuccess(newTask)
      this.setState({
        text: ''
      })
    })


  }

  render(){
    console.log(this.props)
    return <div>
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.name} onChange={this.handleChange} />
        <input type='submit' value='Add'/>
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
  createTaskSuccess,
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)