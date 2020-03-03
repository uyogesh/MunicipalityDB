
import React, { Component } from 'react';
import ListMarriage from '../components/municipality/listMarriage';
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
        <ListMarriage history={this.props.history} />
      </div>
    );
  }
}
