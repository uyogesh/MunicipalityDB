import React, { Component } from 'react';
import ListMigrationComp from '../components/municipality/listMigration';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class ListMigration extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={4} />
        <ListMigrationComp history={this.props.history} />
      </div>
    );
  }
}
