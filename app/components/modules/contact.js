import React, { Component } from 'react';
import styles from '../CreateAccount.css';
import Common from './common';
import Title from './title';
import CheckBox from './checkBox';

export default class contact extends Component {
  render() {
    return (
      <div>
        <Title for="Contact Info" />
        <Common for="name" componentCommon="input" titleCommon="Name" typeCommon="text" />
        <Common for="email" componentCommon="input" titleCommon="Email" typeCommon="text" />
        <Common for="phone" componentCommon="input" titleCommon="Phone Number" typeCommon="text" />
        <Common for="address" componentCommon="input" titleCommon="Address" typeCommon="text" />
        <Common for="city" componentCommon="input" titleCommon="City" typeCommon="text" />
        <Common for="state" componentCommon="input" titleCommon="State" typeCommon="text" />
        <Common for="zip" componentCommon="input" titleCommon="Zip" typeCommon="text" />
        <div className={styles.horizontalContainer}>
          <div className={styles.textlabel}>Role </div>
          <div className={styles.horizontalCon}>
            <CheckBox for="physician" componentCommon="input" titleCommon="Physician" typeCommon="checkbox" />
            <CheckBox for="nurse" componentCommon="input" titleCommon="Nurse" typeCommon="checkbox" />
            <CheckBox for="physicianassistant" componentCommon="input" titleCommon="Physician Assistant" typeCommon="checkbox" />
            <CheckBox for="other" componentCommon="input" titleCommon="Other" typeCommon="checkbox" />
          </div>
        </div>
      </div>

    );
  }
}
