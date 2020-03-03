import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import styles from './Login.css';
import nepalGoverment from '../../resources/nep_gov.png';
import { logUserIn } from '../actionsnew/login';

class Login extends React.Component {
  static propTypes = {
    logUserIn: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired

  };
  submit = (formProps) => {
    console.log(formProps);
    console.log('Reached');
    this.props.logUserIn(formProps, this.props.history);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className={styles.invalid}>
          {this.props.errorMessage}
        </div>
      );
    }
  }
  // handleSubmit  disabled={pristine || submitting}

  render() {
    const {
      pristine, submitting, auth, handleSubmit
    } = this.props;
    console.log('error state is :', auth);
    return (

      <div className={styles.background}>
        <div className={styles.title}>
          <span className={styles.fnt40}>घटना दर्ता अभिलेख</span>
        </div>
        <div className={styles.image}>
          <img className={styles.image2} src={nepalGoverment} alt="Silver View Icon" />
        </div>
        <form onSubmit={handleSubmit(this.submit)} >
          <div className={styles.rectangle2}>
            <div className={styles.email}>Username</div>
            <Field
              className={styles.emailBox}
              component="input"
              name="email"
              type="text"
              placeholder="Enter your Username here"
            />


            <div className={styles.password}>Password</div>
            <Field
              className={styles.passwordBox}
              component="input"
              name="password"
              type="password"
              placeholder="Enter your Password here"
            />
            <hr />
            { auth.auth_failed ? <span className={styles.danger}> Incorrect Username/Password </span> : null }
            <button type="submit" className={styles.loginBox} >
              <p className={styles.login}>LOGIN</p>
            </button>
          </div>
        </form>
      </div>


    );
  }
}

const reduxFormLogin = reduxForm({
  form: 'signin'
})(Login);

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logUserIn })(reduxFormLogin);

