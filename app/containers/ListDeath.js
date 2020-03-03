import React, { Component } from 'react';
import ListDeathComp from '../components/municipality/listDeath';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class ListBirth extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={5} />
        <ListDeathComp history={this.props.history} />
      </div>
    );
  }
}
