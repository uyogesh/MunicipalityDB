import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { PropTypes } from 'prop-types';
import Title from '../title';
import styles from '../../CreateAccount.css';
import LabelRow from '../labelRow';

const renderField = ({
  input, className, type, meta: { touched, error }
}) => (

  <div className={className}>
    <input className={styles.inputBoxDevice} {...input} type={type} />
    {touched && error && <span>{error}</span>}
  </div>

);

renderField.propTypes = {
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired
};

const renderDevices = ({ fields }) => (
  [fields.map((field, index) => (
    <div className={styles.deviceInner}>
      <label htmlFor="name" className={styles.deviceLabel}>`#${ index + 1 }` </label>
      <div className={styles.deviceRow}>
        <Field
          name={`${field}.type`}
          type="text"
          label="Type"
          className={styles.deviceDivShort}
          component={renderField}
        />
        <Field
          name={`${field}.assetTag`}
          type="text"
          label="Asset Tag"
          className={styles.deviceDivShort}
          component={renderField}
        />
        <Field
          name={`${field}.serialNumber`}
          type="text"
          label="Serial Number"
          className={styles.deviceDivLong}
          component={renderField}
        />
      </div>
    </div>
  )),
    <div className={styles.addAnotherContainer}><a onClick={() => fields.push({})} onKeyPress={() => {}} role="button" tabIndex="-1"><span className={styles.addAnotherText}>&#x2295; Add Another Device</span></a></div>]

);

renderDevices.propTypes = {
  fields: PropTypes.func.isRequired
};

export default class Devices extends Component {
  render() {
    return (
      <div>
        <Title for="Devices" />
        <div className={styles.horizontalContainer} >
          <LabelRow for="type" titleCommon="Type" />
          <LabelRow for="assetTag" titleCommon="Asset Tag" />
          <LabelRow for="serialNumber" titleCommon="Serial Number" />
        </div>
        <FieldArray
          component={renderDevices}
          name="devices"
        />
      </div>

    );
  }
}
