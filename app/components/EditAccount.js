import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './EditAccount.css';
import PageTitle from './modules/pageTitle';
import InfoStatusBar from './modules/infoStatusBar';
import General from './modules/general';
import Contacts from './modules/Edit/contacts';
import Devices from './modules/Edit/devices';
import FilesAndDocument from './modules/filesAndDocument';
import AccountCustomization from './modules/accountCustomization';
import ToggleButton from './modules/toggleButton';
import Button from './modules/Button';
import AddAnother from './modules/addAnother';
import store from '../index';
import { submitCreateUser, getAccountDetail } from '../actions';


const validator = (values) => {
  const error = {};
  if (!values.name) {
    error.name = 'Name cannot be Empty!';
  }
  if (!values.owner) {
    error.owner = 'Owner cannot be Empty!';
  }
  if (!values.practice) {
    error.practice = 'Practice Name cannot be Empty!';
  }
  return error;
};
class EditAccount extends React.Component {
  static propTypes={
    handleSubmit: PropTypes.func.isRequired,
    submitCreateUser: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    getAccountDetail: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getAccountDetail(this.props.history.location.state.id);
  }

  renderField = ({ meta: { touched, error, warning } }) => (

    <div>
      {touched && ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
    </div>
  )


  submit = (formProps) => {
    this.props.submitCreateUser(formProps);
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

  render() {
    const { handleSubmit } = this.props;
    console.log('props in editaccount aayo ki nai');
    console.log(this.props.history.location.state.id);
    console.log('The App Store from edit :');
    console.log(store.getState());
    return (
      <div className={styles.providerAccountBlank}>
        <button
          className={styles.backButton}
          data-tid="backButton"
          onClick={this.showDialog}
        >
          <i className="fa fa-arrow-left fa-3x" />
        </button>
        <PageTitle for="Provider Account" />
        <div className={styles.boarderRectangle} />
        <InfoStatusBar for="If you need to change any information associated with your account,select Edit to the right of the section.Select SAVE button when you are finished." />
        <form onSubmit={handleSubmit(this.submit)}>
          <div className={styles.generalInfoContainer}>
            <General />
          </div>
          <div className={styles.contactInfoContainer}>
            <Contacts />
          </div>
          <div className={styles.filesandDocumentContainer}>
            <FilesAndDocument />
            <AddAnother for="Upload files" />
          </div>
          <div className={styles.devicesContainer}>
            <Devices />
          </div>
          {/* <div className={styles.accountSettingsContainer}>
            <AccountSettings />
          </div> */}
          <div className={styles.accountCustomizationContainer}>
            <AccountCustomization />
          </div>
          <div className={styles.toggleButtonContainer}>
            <ToggleButton />
          </div>
          <div className={styles.buttonContainer}>
            <Button />
          </div>

        </form>
      </div>
    );
  }
}

const reduxFormEditAccount = reduxForm({
  form: 'editAccount',
  validate: validator,
//   initialValues: {
//     locations: [
//       {}
//     ],
//     devices: [
//       {}
//     ],
//     contacts: [
//       {}
//     ]
//   }
})(EditAccount);

function mapStateToProps(state) {
  console.log('mapstate');
  console.log(state.accountdetail.accountDetail.accountDetail);
  return {
    errorMessage: state.auth.error,
    initialValues: state.accountdetail.accountDetail.accountDetail
  };
}

export default connect(
  mapStateToProps,
  {
    getAccountDetail, submitCreateUser
  }
)(reduxFormEditAccount);
