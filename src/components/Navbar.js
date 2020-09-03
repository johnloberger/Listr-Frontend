import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'
import note from '../images/note.png'

class Navbar extends React.Component {

  handleLogout = () => {
    this.props.logoutUser()
    localStorage.removeItem('token')
  }

  render() {
    console.log(this.props)
    return (
      <div className={`ui inverted blue menu`}>
        <Link to='/home' className="item">
          <h2 className="ui header">
            <img src={note}/>
            <div className="content">Listr</div>
          </h2>
        </Link>
       
        <div className="right menu">
          <div className="item">
      {
        this.props.auth ?
        <Link to='/login' className="ui button" onClick={this.handleLogout}>
          Logout
        </Link>
        :
        <Link to='/login' className="ui button">
          Login
        </Link>
      }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);






