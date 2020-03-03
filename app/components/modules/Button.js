import React, { Component } from 'react';
import styles from '../CreateAccount.css';

export default class Button extends Component {
  render() {
    return (
      <div>
        <button type="submit" className={styles.saveButton} >
              Save
        </button>
      </div>


    );
  }
}
