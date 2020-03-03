import React, { Component } from 'react';
import CreateDeath from '../components/municipality/createDeath';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class CreateAccountPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={5} />
        <CreateDeath history={this.props.history} />
      </div>
    );
  }
}
