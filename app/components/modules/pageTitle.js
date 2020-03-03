import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateAccount.css';

export default class PageTitle extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div>
        <label
          className={styles.pageTitleContainer}
          htmlFor={this.props.for}
        >
          {this.props.for}
        </label>

      </div>

    );
  }
}
