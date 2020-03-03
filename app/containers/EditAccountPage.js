import React, { Component } from 'react';
import EditAccount from '../components/EditAccount';


type Props = {
  history:{}
};

export default class EditAccountPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <EditAccount history={this.props.history} />
    );
  }
}
