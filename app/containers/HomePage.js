import React, { Component } from 'react';
import Home from '../components/Home';
import NavBar from '../components/modules/navBar';

type Props = {
};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar />
        <Home authenticated={false} />
      </div>
    );
  }
}
