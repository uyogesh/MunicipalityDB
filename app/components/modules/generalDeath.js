import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Title from './title';
// import { validateMoreThan5, validateMoreThan10 } from '../../validators';

import styles from '../CreateAccount.css';

// const dropdownData = {
//   owners: [
//     ' ',
//     'Owner1',
//     'Owner2',
//     'Owner3'
//   ],
//   state: [
//     ' ',
//     'PK',
//     'NY',
//     'RM',
//     'WN'
//   ]
// };


const onKeyPressed = () => { };
const renderField = ({
  input, label, type, meta: { touched, error }
}) => (
  <div className={styles.commonContainer}>
    <div className={styles.labelContainer}>
      <label htmlFor className={styles.textLabel}>{label}</label>
    </div>
    <div className={styles.inputBoxContainer}>
      <input className={styles.inputBox} {...input} type={type} />
      {touched && <span className={styles.errorText}>{error}</span>}
    </div>
  </div>
);
const renderDropDown = ({
  name, label, options, meta: { touched, error }
}) => (
  <div className={styles.commonContainer}>
    <div className={styles.labelContainer}>
      <label htmlFor className={styles.textLabel}>{label}</label>
    </div>
    <div className={styles.inputBoxContainer}>
      <Field name={name} className={styles.inputBox} component="select">
        {options.map(option => (
          <option
            value={option}
            title={option}
            className={styles.input}
          >{option}
          </option>
          ))}
      </Field>
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  </div>
);


renderDropDown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.func.isRequired,
  options: PropTypes.shape.isRequired
};
renderField.propTypes = {
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.func.isRequired
};

const renderlocation = ({ fields }) =>
  [fields.map((field, index) => (
    <div key={`individual${field}`}>
      <h3 className={styles.indexLabel} key={`${field}`}>Person #{index + 1} </h3>
      <Field
        name={`${field}.migratorName`}
        type="text"
        label="बसाई सरै गर्ने ब्यक्ती वा परिवारको नाम थर"
        component={renderField}
      />
      <Field
        name={`${field}.relationWithInformer`}
        type="text"
        label="सुचक सँग को नाता"
        component={renderField}
      />
      <Field
        name={`${field}.dob`}
        type="text"
        label="जन्म मिति"
        component={renderField}
      />
      <Field
        name={`${field}.gender`}
        type="text"
        label="लिङ्ग"
        component={renderField}
      />
      <Field
        name={`${field}.pob`}
        type="text"
        label="जन्म भएको स्थान"
        component={renderField}
      />
      <Field
        name={`${field}.currentLocation`}
        type="text"
        label="हाल को स्थाई ठेगाना"
        component={renderField}
      />
      <Field
        name={`${field}.outDestLocation`}
        type="text"
        label="बसाइ सरी जाने स्थान"
        component={renderField}
      />
      <Field
        name={`${field}.inDestLocation`}
        type="text"
        label="बसाइ सरी आएको स्थान"
        component={renderField}
      />
      <Field
        name={`${field}.citizenshipIssuedFrom`}
        type="text"
        label="नागरिकता लिएको भये ना. प्र. प. न लिएको जिल्ला"
        component={renderField}
      />
      <Field
        name={`${field}.issuesRegistered`}
        type="text"
        label="ब्यक्तिगत घटना को दर्ता भये/नभयेको विवरण"
        component={renderField}
      />

    </div>
  )), <div className={styles.addAnotherContainer}> <a className={styles.addAnotherText} role="button" tabIndex="0" onKeyPress={onKeyPressed} onClick={() => { console.log(fields); fields.push({}); }} title="Add Person"><span>&#x2295; </span>Add Person</a></div>];


renderlocation.propTypes = {
  fields: PropTypes.isRequired
};

export default class General extends Component {
  render() {
    return (
      <div>
        <Title for="मृत्यु दर्ता" />
        <Field
          name="regNo"
          type="text"
          label="दर्ता न"
          component={renderField}
        />
        <Field
          name="regDate"
          type="text"
          label="दर्ता मिति"
          component={renderField}
        />
        <Field
          name="personName"
          type="text"
          label="नाम/थर "
          component={renderField}
        />
        <Field
          name="dod"
          type="text"
          label="मृत्यु भयेको मिति"
          component={renderField}
        />
        <Field
          name="age"
          type="text"
          label="उमेर"
          component={renderField}
        />
        <Field
          name="gender"
          type="text"
          label="लिङ्ग"
          options={['महिला', 'पुरुष', 'अन्य']}
          component={renderDropDown}
        />
        <Field
          name="citizenPlace"
          type="text"
          label="नागरिकता लियेको भये, जारि जिल्ला "
          component={renderField}
        />
        <Field
          name="citizenDate"
          type="text"
          label="नागरिकता लियेको भये, जारि मिति "
          component={renderField}
        />
        <Field
          name="placeOfDeath"
          type="text"
          label="मृत्यु भयेको स्थान"
          component={renderField}
        />
        <Field
          name="permAdd"
          type="text"
          label="स्थायी ठेगाना"
          component={renderField}
        />
        <Field
          name="tempAdd"
          type="text"
          label="अस्थाई ठेगाना"
          component={renderField}
        />
        <Field
          name="grandDad"
          type="text"
          label="बाजेको नाम"
          component={renderField}
        />

        <Field
          name="dad"
          type="text"
          label="बाबुको नाम"
          component={renderField}
        />
        <Field
          name="spouseName"
          type="text"
          label="पति पत्नी को नाम"
          component={renderField}
        />

        <Field
          name="informerName"
          type="text"
          label="सुचक को नाम,ठेगाना,ना.प्र.प र जिल्ला"
          component={renderField}
        />
        <Field
          name="certReceiver"
          type="text"
          label="प्रमाण पत्र बुझ्को मिति "
          component={renderField}
        />
        <Field
          name="issuersName"
          type="text"
          label="दर्ता गर्ने पन्झिकधिकारी को नाम"
          component={renderField}
        />
        <Field
          name="misc"
          type="text"
          label="कैफियत"
          component={renderField}
        />

      </div>
    );
  }
}
