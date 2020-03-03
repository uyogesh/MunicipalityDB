import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { PropTypes } from 'prop-types';
import styles from '../../CreateAccount.css';
import Title from '../title';
import { validateMoreThan5, validateMoreThan10 } from '../../../validators';

// const dropdownData = {
//   owners: [
//     '',
//     'Owner1',
//     'Owner2',
//     'Owner3'
//   ],
//   state: [
//     '',
//     'PK',
//     'NY',
//     'RM',
//     'WN'
//   ]
// };
const onKeyPressed = () => {};
const renderField = ({
  input, label, type, meta: { touched, error }
}) => (
  <div className={styles.commonContainer}>
    <div className={styles.labelContainer}>
      <label htmlFor className={styles.textLabel}>{label}</label>
    </div>
    <div className={styles.inputBoxContainer}>
      <input className={styles.inputBox} {...input} type={type} />
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  </div>
);

renderField.propTypes = {
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.func.isRequired
};

const renderDropDown = ({
  label, options, meta: { touched, error }
}) => (
  <div className={styles.commonContainer}>
    <div className={styles.labelContainer}>
      <label htmlFor className={styles.textLabel}>{label}</label>
    </div>
    <div className={styles.inputBoxContainer}>
      <Field className={styles.inputBox} component="select">
        {options.map(option => (
          <option value={option} title={option} className={styles.input}>{option}</option>
        ))}
      </Field>
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  </div>
);


renderDropDown.propTypes = {
  label: PropTypes.string.isRequired,
  meta: PropTypes.func.isRequired,
  options: PropTypes.shape.isRequired
};

const renderContact = ({ fields }) =>
  [fields.map((field, index) => (
    <div key={`contact${field}`}>
      <h3 className={styles.indexLabel} key={`${field}`}>Contact #{index + 1} </h3>
      <Field
        name={`${field}.name`}
        type="text"
        label="Name"
        component={renderField}
      />
      <Field
        name={`${field}.email`}
        type="text"
        label="Email*"
        component={renderField}
      />
      <Field
        name={`${field}.phone`}
        type="text"
        label="Phone Number*"
        validate={validateMoreThan10}
        component={renderField}
      />
      <Field
        name={`${field}.address`}
        type="text"
        label="Address*"
        component={renderField}
      />
      <Field
        name={`${field}.city`}
        type="text"
        label="City*"
        component={renderField}
      />
      <Field
        name={`${field}.state`}
        type="text"
        label="State"
        component={renderField}
      />
      <Field
        name={`${field}.zip`}
        type="text"
        label="ZIP"
        validate={validateMoreThan5}
        component={renderField}
      />

    </div>
  )), <div className={styles.addAnotherContainer}><a className={styles.addAnotherText} role="button" tabIndex="0" onKeyPress={onKeyPressed} onClick={() => { console.log(fields); fields.push({}); }} title="Add Contacts"><span>&#x2295; </span>Add Contacts</a></div>];


renderContact.propTypes = {
  fields: PropTypes.isRequired
};

export default class Contacts extends Component {
  render() {
    return (
      <div>
        <Title for="Contacts:" />
        <FieldArray
          name="contacts"
          component={renderContact}
        />
      </div>
    );
  }
}
