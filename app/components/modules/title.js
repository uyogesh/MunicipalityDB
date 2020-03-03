import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateAccount.css';

export default class Title extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={styles.titleContainer}>
        <label
          htmlFor={this.props.for}
        >
          {this.props.for
            }
        </label>

      </div>

    );
  }
}
