import React, { Component } from 'react';
import ListAccount from '../components/municipality/listMigration';


type Props = {
  history:{}
};

export default class AccountListPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <ListAccount history={this.props.history} />
    );
  }
}
