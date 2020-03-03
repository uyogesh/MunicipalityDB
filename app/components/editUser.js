
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import styled from 'styled-components';
import styles from './CreateAccount.css';
import { updateUser } from '../actionsnew/settings';

const style = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ButtonGreen = styled.button`
  width: 20%;
  background-color: #3cd52e;
  font-family: Futura;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  margin: 20px;
`;

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

class EditUser extends React.Component {
  state={
    role: ''
  }
  submit = (formData) => {
    // console.log(formData);
    formData.role = this.state.role;
    this.props.updateUser(this.props.initialValues._id.toString(), formData);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderDropDown = ({
    input, label, classes, type, value, onChange, meta: { touched, error }
  }) => (
    <div className={styles.commonContainer}>
      <div className={styles.labelContainer} style={{ paddingTop: '8%' }}>
        <label htmlFor className={styles.textLabel}>{label}</label>
      </div>
      <div className={styles.inputBoxContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="role-simple">जिम्बेबारी</InputLabel>
          <Select
            value={this.state.role}
            onChange={this.handleChange}
            inputProps={{
                name: 'role',
                id: 'role-simple',
              }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          <Field
            name="name"
            type="text"
            label="नाम"
            component={renderField}
          />
          <Field
            name="username"
            type="text"
            label="साङ्केतिक नाम"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            label="गोप्य शब्द"
            component={renderField}
          />
          <Field
            label="जिम्बेबारी"
            value={this.state.role}
            onChange={this.handleChange}
            component={this.renderDropDown}
            classes={classes}
          />
          <Div>
            <ButtonGreen type="submit">
                  सन्चय गर्नुहोस
            </ButtonGreen>
          </Div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { initialValues: state.auth.selected_user }
);

const formComponent = reduxForm({
  form: 'editUser'
})(EditUser);

const withStyleComponent = withStyles(style)(formComponent);

export default connect(mapStateToProps, { updateUser })(withStyleComponent);
