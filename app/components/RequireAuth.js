import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {
     static propTypes = {
       history: PropTypes.shape({
         push: PropTypes.func,
       }).isRequired,
       authenticated: PropTypes.bool.isRequired
     };
     componentWillMount() {
       if (!this.props.authenticated) {
         this.props.history.push('/login');
       }
     }

     componentWillUpdate(nextProps) {
       if (!nextProps.authenticated) {
         this.props.history.push('/login');
       }
     }

    PropTypes = {
      history: PropTypes.object,
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
