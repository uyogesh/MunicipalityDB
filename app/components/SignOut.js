
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutUserAction } from '../actions/signOutUserAction';

class Signout extends Component {
  static propTypes = {
    signOutUserAction: PropTypes.func.isRequired,
  };
  componentWillMount() {
    this.props.signOutUserAction();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}
export default connect(null, { signOutUserAction })(Signout);
