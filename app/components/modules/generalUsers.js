import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { CloseRounded } from '@material-ui/icons';
import Common from './common';
import closeIcon from '../../../resources/close-icon.png';
import Title from './title';
import CheckBox from './checkBox';
import styles from '../municipality/CreateAccount.css';
import EditUser from '../editUser';
import CreateUser from '../createUser';
import { selectUser, deselectUser, showCreateDialog, hideCreateDialog, deleteUser } from '../../actionsnew/settings';


const Div = styled.div`
  width:100%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const InnerLink = styled.a`
  color: #3cd52e;
`;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const style = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: '#00a8e1', // theme.palette.background.paper
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


class AccountSettings extends Component {
  state = {
    open: false
  }

  render() {
    const {
      users, classes, selUser, showCreateUser
    } = this.props;
    console.log(users);
    return (
      <div>
        <Title for="Account Settings" />
        <Div>
          <div className={styles.addAnotherText}>
            <InnerLink
              role="button"
              onKeyDown
              tabIndex={0}
              onClick={() => {
                this.props.showCreateDialog();
              }}
            >
              <span>&#x2295; </span> ब्यक्ती थप्नुहोस
            </InnerLink>
          </div>
        </Div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={(selUser !== null) || showCreateUser}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className={styles.imgContainer}>
              <a
                role="button"
                onKeyDown
                tabIndex={-1}
                onClick={() => {
                    this.props.deselectUser();
                    this.props.hideCreateDialog();
                }}
              >
                <img src={closeIcon} alt="close" width="20px" height="20px" />
              </a>
            </div>
            { selUser ? <EditUser /> : null }
            { showCreateUser ? <CreateUser /> : null}
            {/* <SimpleModalWrapped /> */}
          </div>
        </Modal>
        <div className={styles.verticalContainer}>
          <div className={styles.contain}>
            {users.filter((user) => user.role === 'user').map((user, index) => (
              <div className={styles.userContainer}>
                <div className={styles.userHolder}>
                  <p className={styles.userHolder}>{user.name}</p>
                </div>
                <div className={styles.flx}>
                  <div>
                    <a
                      role="button"
                      onKeyDown
                      tabIndex={0}
                      onClick={() => {
                      this.props.selectUser(user);
                    }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                        />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a
                      role="button"
                      onKeyDown
                      tabIndex={0}
                      onClick={() => {
                      this.props.deleteUser(user._id.toString());
                    }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#990000" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.contain}>
            {users.filter((user) => user.role === 'admin').map((user, index) => (
              <div className={styles.userContainer}>
                <div className={styles.userHolder}>
                  <p className={styles.userHolder}>{`${user.name}*`}</p>
                </div>
                <div className={styles.flx}>
                  <div>
                    <a
                      role="button"
                      onKeyDown
                      tabIndex={0}
                      onClick={() => {
                      this.props.selectUser(user);
                    }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                        />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a
                      role="button"
                      onKeyDown
                      tabIndex={0}
                      onClick={() => {
                      this.props.deleteUser(user._id.toString());
                    }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#990000" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => (
  {
    selUser: state.auth.selected_user,
    showCreateUser: state.auth.showCreateUser
  }
);

const SimpleModalWrapped = withStyles(style)(AccountSettings);


export default connect(mapStateToProps, {
  selectUser, deselectUser, hideCreateDialog, showCreateDialog, deleteUser
})(SimpleModalWrapped);
