import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styles from '../CreateAccount.css';

export default class checkBox extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
    titleCommon: PropTypes.string.isRequired,
    componentCommon: PropTypes.string.isRequired,
    typeCommon: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={styles.checkBoxContainer}>
        <Field
          className={styles.checkBox}
          type={this.props.typeCommon}
          name={this.props.for}
          component={this.props.componentCommon}
        />
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
