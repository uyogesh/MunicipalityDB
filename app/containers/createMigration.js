import React, { Component } from 'react';
import CreateMigration from '../components/municipality/CreateMigration';
import NavBar from '../components/modules/navBar';

type Props = {
  history:{}
};

export default class CreateAccountPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar history={this.props.history} active={4} />
        <CreateMigration history={this.props.history} />
      </div>
    );
  }
}
