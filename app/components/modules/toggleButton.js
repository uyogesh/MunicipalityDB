import React, { Component } from 'react';
import styles from '../CreateAccount.css';
import LabelRow from './labelRow';

export default class ToggleButton extends Component {
  render() {
    return (
      <div>
        <div className={styles.horizontalCon} >
          <LabelRow for="makeaccountsreadonly" titleCommon="Make the accounts read only" />
        </div>
        <div className={styles.horizontalCon} >
          <LabelRow for="disable" titleCommon="Disable Accounts" />
        </div>
      </div>


    );
  }
}
