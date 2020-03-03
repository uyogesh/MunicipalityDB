import React, { Component } from 'react';
import { FieldArray, Field } from 'redux-form';
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
        type="select"
        label="लिङ्ग"
        options={['महिला', 'पुरुष', 'अन्य']}
        component={renderDropDown}
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
        <Title for="Migration" />
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
          name="migrationDate"
          type="text"
          label="बसाई सरै गरेर गएको/आएको मिति "
          component={renderField}
        />
        <FieldArray
          name="individual"
          component={renderlocation}
        />

        <Field
          name="informerName"
          type="text"
          label="सुचक को नाम "
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


{ /* <Field  //
          name="migratorName"
          type="text"
          label="बसाई सरै गर्ने ब्यक्ती वा परिवारको नाम थर"
          component={renderField}
        />
        <Field
          name="relationWithInformer"
          type="text"
          label="सुचक सँग को नाता"
          component={renderField}
        />
        <Field
          name="dob"
          type="text"
          label="जन्म मिति"
          component={renderField}
        />
        <Field
          name="gender"
          type="text"
          label="लिङ्ग"
          component={renderField}
        />
        <Field
          name="pob"
          type="text"
          label="जन्म भएको स्थान"
          component={renderField}
        />
        <Field
          name="currentLocation"
          type="text"
          label="हाल को स्थाई ठेगाना"
          component={renderField}
        />
        <Field
          name="outDestLocation"
          type="text"
          label="बसाइ सरी जाने स्थान"
          component={renderField}
        />
        <Field
          name="inDestLocation"
          type="text"
          label="बसाइ सरी आएको स्थान"
          component={renderField}
        />
        <Field
          name="citizenshipIssuedFrom"
          type="text"
          label="नागरिकता लिएको भये ना. प्र. प. न लिएको जिल्ला"
          component={renderField}
        />
        <Field
          name="issuesRegistered"
          type="text"
          label="ब्यक्तिगत घटना को दर्ता भये/नभयेको विवरण"
          component={renderField}
        /> */ }
