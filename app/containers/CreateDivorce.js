import React, { Component } from 'react';
import CreateDivorceComp from '../components/municipality/CreateDivorce';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class CreateDivorce extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={3} />
        <CreateDivorceComp history={this.props.history} />
      </div>
    );
  }
}
