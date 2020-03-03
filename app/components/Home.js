import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';


class Home extends Component {
static propTypes = {
  authenticated: PropTypes.bool.isRequired
}

navbarLinks() {
  if (this.props.authenticated) {
    return [
      <li key="createAccount"><Link to="/createAccount">Create Account</Link></li>,
      <li key="counter"><Link to="/counter">Counter</Link></li>,
      <li key="accountlist"><Link to="/accountlist">Account List</Link></li>,
      <li key="signout"><Link to="/signout">Sign out</Link></li>
    ];
  }
  return [
    <li key="login"><Link to="/login">Login</Link></li>,
    <li key="signup"><Link to="/signup">Register</Link></li>
  ];
}

render() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <ul>
        {this.navbarLinks()}
      </ul>
    </div>

  );
}
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}


export default connect(mapStateToProps)(Home);
