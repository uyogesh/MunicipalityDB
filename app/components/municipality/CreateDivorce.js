import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';
import styles from './CreateAccount.css';
import PageTitle from '../modules/pageTitle';
import General from '../modules/generalDivorce';
import Buttons from '../modules/Button';
import { addDivorce } from '../../actionsnew/divorce';

const required = value => (value ? undefined : 'Required');

// const validator = (values) => {
//   const error = {};
//   if (!values.name) {
//     error.name = 'Name cannot be Empty!';
//   }
//   if (!values.owner) {
//     error.owner = 'Owner cannot be Empty!';
//   }
//   if (!values.practice) {
//     error.practice = 'Practice Name cannot be Empty!';
//   }
//   return error;
// };
class CreateDivorce extends React.Component {
  static propTypes={
    handleSubmit: PropTypes.func.isRequired,
    // submitCreateUser: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  state= {
    open: false,
    formData: null
  }

  renderField = ({ meta: { touched, error, warning } }) => (

    <div>
      {touched && ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
    </div>
  )


  submit = (formProps) => {
    this.setState({
      formData: formProps,
      open: true
    });
  };

  showDialog = () => {
    if (this.props.dirty) {
      confirmAlert({
        title: 'Are you sure you want to leave this page? ',
        message: 'Your changes will not be saved.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.props.history.push('/')
          },
          {
            label: 'No',
            // onClick: () => alert('No')
          }
        ],
      });
    }
  };

  handleClose() {
    this.setState({
      open: false,
      formData: null
    });
  }

  handleSelect() {
    console.log('handleSelect Called', this.state.formData);
    addDivorce(this.state.formData, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={styles.providerAccountBlank}>
        <Dialog
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'के यो दर्ता विवरण साच्चिकै सन्चय गर्न चहानु हुन्छ ?'}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => this.handleSelect()} color="primary">
              हुन्छ
            </Button>
            <Button onClick={() => this.handleClose()} color="secondary">
              हुन्न
            </Button>

          </DialogActions>
        </Dialog>
        <PageTitle for="सम्बन्ध विच्छेद" />
        <div className={styles.boarderRectangle} />
        {/* <InfoStatusBar for="Fields marked with * are Required" /> */}
        <form onSubmit={handleSubmit(this.submit)}>
          <div className={styles.generalInfoContainer}>
            <General />
          </div>
          <div className={styles.buttonContainer}>
            <Buttons />
          </div>

        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'createDivorce',
  validate: required

})(CreateDivorce);

// function mapStateToProps(state) {
//   return {
//     errorMessage: state.auth.error
//   };
// }

// export default connect(null, { submitCreateUser })(reduxFormCreateAccount);
