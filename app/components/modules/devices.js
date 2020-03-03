import React, { Component } from 'react';
import styles from '../CreateAccount.css';
import Title from './title';
import LabelRow from './labelRow';
import InputRow from './inputRow';

export default class Devices extends Component {
  render() {
    return (
      <div>
        <Title for="Devices" />
        <div className={styles.horizontalContainer} >
          <LabelRow for="type" titleCommon="Type" />
          <LabelRow for="assetTag" titleCommon="Asset Tag" />
          <LabelRow for="serialNumber" titleCommon="Serial Number" />
        </div>
        <div className={styles.horizontalContainer} >
          <InputRow for="type" componentCommon="input" typeCommon="text" />
          <InputRow for="assetTag" componentCommon="input" typeCommon="text" />
          <InputRow for="serialNumber" componentCommon="input" typeCommon="text" />
        </div>
      </div>

    );
  }
}
