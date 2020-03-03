import React, { Component } from 'react';
import Common from './common';
import Title from './title';
import CheckBox from './checkBox';
import styles from '../CreateAccount.css';

export default class AccountSettings extends Component {
  render() {
    return (
      <div>
        <Title for="Account Settings" />
        <Common for="subscriptiontier" componentCommon="input" titleCommon="Subscription Tier" typeCommon="text" />
        <div className={styles.verticalContainer}>
          <CheckBox for="assesments" componentCommon="input" titleCommon="Assessments" typeCommon="checkbox" />
          <CheckBox for="labs" componentCommon="input" titleCommon="Labs" typeCommon="checkbox" />
          <CheckBox for="macrareporting" componentCommon="input" titleCommon="Macra Reporting" typeCommon="checkbox" />
          <CheckBox for="patienteducation" componentCommon="input" titleCommon="Patient Education" typeCommon="checkbox" />
          <CheckBox for="referalls" componentCommon="input" titleCommon="Referalls" typeCommon="checkbox" />

        </div>

      </div>

    );
  }
}
