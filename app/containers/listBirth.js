import React, { Component } from 'react';
import ListBirthComp from '../components/municipality/listBirth';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class ListBirth extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={1} />
        <ListBirthComp history={this.props.history} />
      </div>
    );
  }
}
