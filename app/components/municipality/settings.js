import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import backup from 'mongodb-backup';
import { backupDb } from '../../backup';
// import { FilePicker } from 'react-file-picker';
// import { connect } from 'react-redux';
import styles from './CreateAccount.css';
import PageTitle from '../modules/pageTitle';
import InfoStatusBar from '../modules/infoStatusBar';
import General from '../modules/generalUsers';
// import Contacts from './modules/Edit/contacts';
// import Devices from './modules/Edit/devices';
// import FilesAndDocument from './modules/filesAndDocument';
// import AccountCustomization from './modules/accountCustomization';
// import ToggleButton from './modules/toggleButton';
import Button from '../modules/Button';
// import AddAnother from './modules/addAnother';
// import { submitCreateUser } from '../actions';
import store from '../../index';
import { addMigration } from '../../actionsnew/migration';
import { getAllUsers } from '../../actionsnew/settings';

const required = value => (value ? undefined : 'Required');

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
class Settings extends React.Component {
  static propTypes={
    handleSubmit: PropTypes.func.isRequired,
    // submitCreateUser: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  renderField = ({ meta: { touched, error, warning } }) => (

    <div>
      {touched && ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
    </div>
  )


  submit = (formProps) => {
    addMigration(formProps);
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

  changeField() {
    // store.dispatch(change('createAccount', 'type', 'AAAAAAA'));
  }

  componentWillMount() {
    this.props.getAllUsers();
  }

  render() {
    const { handleSubmit, auth } = this.props;
    if (auth.users) {
      return (
        <div className={styles.providerAccountBlank}>

          <PageTitle for="सेटिङ्स" />
          <div className={styles.boarderRectangle} />
          <InfoStatusBar for="" />
          <form onSubmit={handleSubmit(this.submit)}>
            <div className={styles.generalInfoContainer}>
              <General users={auth.users} />
            </div>
            {/* <div className={styles.generalInfoContainer}>
              <div className={styles.flx}>
                <a
                  role="button"
                  onKeyDown
                  className={styles.alignRight}
                  tabIndex={0}
                  onClick={() => {
                    backupDb();
                  }}
                >
                  <span>ब्याकप् गर्नु होस्</span>
                </a>
              </div>
            </div> */}
            {/* <div className={styles.buttonContainer}>
              <Button />
            </div> */}

          </form>
          {/* <FilePicker
          >
            <button>
              Upload
            </button>
          </FilePicker> */}
        </div>
      );
    }
    return (
      <div>
                Loading
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { auth: state.auth }
);

const formComponent = reduxForm({
  form: 'settings',
  validate: required,
  initialValues: {
    individual: [
      {}
    ]
  }
})(Settings);

export default connect(mapStateToProps, { getAllUsers })(formComponent);

// function mapStateToProps(state) {
//   return {
//     errorMessage: state.auth.error
//   };
// }

// export default connect(null, { submitCreateUser })(reduxFormCreateAccount);
