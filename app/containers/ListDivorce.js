import React, { Component } from 'react';
import ListDivorceComp from '../components/municipality/listDivorce';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class ListDivorce extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={3} />
        <ListDivorceComp history={this.props.history} />
      </div>
    );
  }
}
