import React, { Component } from 'react';
import NavBar from '../components/modules/navBar';
import Settings from '../components/municipality/settings';

type Props = {
  history:{}
};

export default class CreateAccountPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={6} />
        <Settings />
      </div>
    );
  }
}
