import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styles from '../CreateAccount.css';

export default class InputRow extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
    componentCommon: PropTypes.string.isRequired,
    typeCommon: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={styles.inputBoxRowContainer}>
        <Field
          className={styles.inputBoxRow}
          type={this.props.typeCommon}
          name={this.props.for}
          component={this.props.componentCommon}
        />
      </div>

    );
  }
}
