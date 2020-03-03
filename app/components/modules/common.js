import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styles from '../CreateAccount.css';


export default class Common extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
    titleCommon: PropTypes.string.isRequired,
    componentCommon: PropTypes.string.isRequired,
    typeCommon: PropTypes.string.isRequired,
  }


  constructor() {
    super();
    this.state = {
    };
  }


  render() {
    return (
      <Field
        name={this.props.for}
        key={this.props.for}
        type={this.props.typeCommon}
        component={(value) => (
          <div className={styles.commonContainer}>
            <div className={styles.labelContainer}>
              <label
                className={styles.textLabel}
                htmlFor={this.props.for}
              >
                {this.props.titleCommon}
              </label>
            </div>
            <div className={styles.inputBoxContainer}>
              <input
                className={styles.inputBox}
                {...value.input}
              />
              {value.meta.touched &&
                (value.meta.error &&
                <span className={styles.errorText}>&#x26a0;{value.meta.error}</span>)}
            </div>
          </div>
          )
        }
      />
    );
  }
}
