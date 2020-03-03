import React, { Component } from 'react';
import Common from './common';

export default class location extends Component {
  render() {
    return (
      <div>
        <p>Location</p>
        <Common for="address" componentCommon="input" titleCommon="Address*" typeCommon="text" />
        <Common for="city" componentCommon="input" titleCommon="City*" typeCommon="text" />
        <Common for="state" componentCommon="input" titleCommon="State*" typeCommon="text" />
        <Common for="zip" componentCommon="input" titleCommon="ZIP*" typeCommon="text" />
        <Common for="phone" componentCommon="input" titleCommon="Phone Number*" typeCommon="text" />
        <Common for="fax" componentCommon="input" titleCommon="Fax" typeCommon="text" />
      </div>

    );
  }
}
