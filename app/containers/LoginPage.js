import React, { Component } from 'react';
import Login from '../components/Login';


type Props = {
  history:{}
};

export default class LoginPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Login history={this.props.history} />
    );
  }
}
