import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class NotAuthentication extends Component<> {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func,
      }).isRequired,
      authenticated: PropTypes.bool.isRequired
    };
    componentWillMount() {
      if (this.props.authenticated) {
        this.props.history.push('/counter');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.props.history.push('/counter');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapDispatchToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapDispatchToProps)(NotAuthentication);
}
