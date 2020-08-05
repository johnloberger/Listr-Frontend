import React from 'react';
import { loginSuccess } from '../actions/auth'
import { connect }  from 'react-redux'


class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInputChange = (e) => { this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }

    fetch('http://localhost:3001/api/v1/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        this.props.loginSuccess(data)
        this.props.history.push('/home')
      }
    })
  }

  render(){
    return (
      <div>
        <h3>Please sign-in below!</h3>
        <form onSubmit={this.handleSubmit}>
          <input name={'username'} placeholder='username' onChange={this.handleInputChange} value={this.state.username} />
          <input name={'password'} placeholder='password' onChange={this.handleInputChange} value={this.state.password} />
          <input type='submit' value='login' />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)






