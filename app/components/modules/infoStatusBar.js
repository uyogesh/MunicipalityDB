import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateAccount.css';

export default class PageTitle extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={styles.requiredRectangle}>
        <label
          className={styles.fieldsMarkedWithAreRequired}
          htmlFor={this.props.for}
        >
          {this.props.for}
        </label>

      </div>

    );
  }
}
