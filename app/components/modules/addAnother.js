import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateAccount.css';

export default class AddAnother extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
  }
  render() {
    return (

      <div className={styles.addAnotherContainer}>
        <label
          className={styles.addAnotherText}
          htmlFor={this.props.for}
        >
          {this.props.for
            }
        </label>

      </div>

    );
  }
}
