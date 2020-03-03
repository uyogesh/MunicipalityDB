import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from '../components/dashBoard';
import NavBar from '../components/modules/navBar';

export default class HomePage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={0} />
        <Home />
      </div>
    );
  }
}
