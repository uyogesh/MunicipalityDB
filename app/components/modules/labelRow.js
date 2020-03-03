import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateAccount.css';

export default class LabelRow extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
    titleCommon: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={styles.textlabel}>
        <label
          className={styles.checkboxLabel}
          htmlFor={this.props.for}
        >
          {this.props.titleCommon
            }
        </label>
      </div>

    );
  }
}
