import React from 'react';
import Task from './Task';
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'
import { fetchListsSuccess } from '../actions/list'
import { fetchTasksSuccess } from '../actions/task'


class Dashboard extends React.Component {
  componentDidMount(){
    const token = localStorage.getItem('token')
    console.log(token)
    if (!token) {
      this.props.history.push('/login')
    } else {
      const reqObj = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch('http://localhost:3001/api/v1/current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.currentUser(data)
      })
      fetch('http://localhost:3001/api/v1/lists')
      .then(resp => resp.json())
      .then(lists => {
        const listsToShow = lists.filter(list => list.user_id === this.props.auth.id)
        this.props.fetchListsSuccess(listsToShow)
      })
      fetch('http://localhost:3001/api/v1/tasks')
      .then(resp => resp.json())
      .then(tasks => {
        console.log(tasks)
        this.props.fetchTasksSuccess(tasks)
      })
    }  
  }

  render(){ 
    return (
      <div class="ui three column grid">
        <div className="row">
        {this.props.lists.map(listObj => {
          return <Task {...listObj} tasks={this.props.tasks.filter(task => task.list_id === listObj.id)}/>
        })}
        </div>
    }</div>)
  };
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.auth,
    lists: state.lists,
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  fetchListsSuccess,
  fetchTasksSuccess,
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);








