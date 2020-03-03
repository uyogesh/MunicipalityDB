
import React, { Component } from 'react';
import CreateMarriage from '../components/municipality/createMarriage';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class CreateAccountPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={2} />
        <CreateMarriage history={this.props.history} />
      </div>
    );
  }
}
