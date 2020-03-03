import React, { Component } from 'react';
import styles from '../CreateAccount.css';
import Title from './title';
import LabelRow from './labelRow';

export default class FilesAndDocument extends Component {
  render() {
    return (
      <div>
        <Title for="Files and Documents" />
        <div className={styles.horizontalContainer} >
          <LabelRow for="type" titleCommon="Type" />
          <LabelRow for="name" titleCommon="Name" />
        </div>
        <div className={styles.horizontalContainer} >
          <LabelRow for="pdf" titleCommon="PDF" />
          <LabelRow for="filename" titleCommon="The Smaple.pdf" />
        </div>
      </div>


    );
  }
}
