import React, { Component } from 'react';
import CreateBirth from '../components/municipality/createBirth';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class CreateAccountPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={1} />
        <CreateBirth history={this.props.history} />
      </div>
    );
  }
}
