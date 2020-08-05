import React from 'react';
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { deleteListSuccess } from '../actions/list'
import TaskForm from './TaskForm';
import { updateTaskArray } from '../actions/task'

class Task extends React.Component {

  state = {
    showTasks: false,
    showNewTaskForm: false
  }

  handleShowTasks = (id) => {
    console.log(this.state)
    this.setState({
      showTasks: !this.state.showTasks
    })
  }

  array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; 
  };

  increaseTaskPos = (event, task) => {
    let eventArrayPos = (this.props.tasks.indexOf(event))
    if (eventArrayPos > 0) {
      const newTasksToShow = this.array_move(this.props.tasks, eventArrayPos, eventArrayPos - 1)
      console.log(newTasksToShow)
      const newTaskArr = {
        tasks: newTasksToShow
      }
      const reqObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskArr)
      }
      fetch(`http://localhost:3001/api/v1/lists/${this.props.id}/tasks`, reqObj)
      .then(resp => resp.json())
      .then(tasks => {
        console.log(tasks)
        this.props.updateTaskArray(newTasksToShow)
      })
    } else {
      return null
    }
  }

  decreaseTaskPos = (event, task) => {
    let eventArrayPos = (this.props.tasks.indexOf(event))
    let taskArrLastIndex = (this.props.tasks.indexOf(this.props.tasks.slice(-1)[0]))
    if (eventArrayPos >= 0 && eventArrayPos !== taskArrLastIndex) {
      const newTasksToShow = this.array_move(this.props.tasks, eventArrayPos, eventArrayPos + 1)
      console.log(newTasksToShow)
      const newTaskArr = {
        tasks: newTasksToShow
      }
      const reqObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskArr)
      }
      fetch(`http://localhost:3001/api/v1/lists/${this.props.id}/tasks`, reqObj)
      .then(resp => resp.json())
      .then(tasks => {
        console.log(tasks)
        this.props.updateTaskArray(newTasksToShow)
      })
    } else {
      return null
    }
  }
  
  renderTasks = () => {
    return (
      this.props.tasks.map(task => 
      <div>
        <span onClick={()=>this.increaseTaskPos(task)}>+</span>{task.text}<span onClick={()=>this.decreaseTaskPos(task)}>-</span>
      </div>)
    )
  }

  handleNewTask = () => {
    this.setState({
      showNewTaskForm: !this.state.showNewTaskForm,
      showTasks: true
    })
  }

  handleDelete = (id) => {
    alert('Are you sure you want to delete this list?')
    const reqObj = {
      method: 'DELETE',
      headers: {
        'Content-Type':  'application/json',
      }
    }
    fetch(`http://localhost:3001/api/v1/lists/${id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.deleteListSuccess(id)
    })
  }
  
  renderNewTaskForm = () => {
    return <div>
      <TaskForm {...this.props}/>
    </div>
  }

  render(){
    console.log(this.props)
    return <div style={{marginBottom: "25px"}} className="ui column">
          <div className="ui card">
            <div className="content">
              <div className="header">
              <h1>{this.props.name}</h1>
              <Button primary animated='fade' onClick={()=>this.handleShowTasks(this.props.id)}>
                <Button.Content visible >Show Details</Button.Content>
                <Button.Content hidden>
                  <Icon name='edit outline' />
              </Button.Content>
              </Button>
              <Button animated='vertical' onClick={()=>this.handleNewTask(this.props.id)}>
                <Button.Content hidden>New</Button.Content>
                <Button.Content visible>
                  <Icon name='pencil' />
                </Button.Content>
              </Button>
              {this.state.showNewTaskForm ? this.renderNewTaskForm():null}
              {this.state.showTasks ? this.renderTasks():null}
              </div>
            </div>
              <Button animated='vertical' onClick={()=>this.handleDelete(this.props.id)}>
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                  <Icon name='trash alternate' />
                </Button.Content>
              </Button>
          </div>  
    </div>
  }
}

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {
//     tasks: state.tasks,
//   }
// }

const mapDispatchToProps = {
  updateTaskArray,
  deleteListSuccess
}

export default connect(null, mapDispatchToProps)(Task)