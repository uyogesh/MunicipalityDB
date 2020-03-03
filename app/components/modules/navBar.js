
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import nepalGoverment from '../../../resources/nep_gov.png';
import * as customStyles from './navBar.css';

const styles = {
  root: {
    flexGrow: 1,
    height: 80,
    backgroundColor: '#3f51b5'
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
};

const OutDiv = styled.div`
    display: flex;
    width: 100%;
`;

const InDiv = styled.div`
  display: flex;
  margin-left: 15px;
`;

function DenseAppBar(props) {
  const { classes, history, active } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
            history.replace('/dashboard');
          }}
          >
            <img alt="" src={nepalGoverment} width="70px" height="auto" />
          </IconButton>
          <OutDiv>
            <InDiv>
              <p>शुक्लागण्डकी नगरपालिका</p>
            </InDiv>

            <div className={customStyles.container}>
              <div className={customStyles.navItems}>
                <a
                  className={active === 1 ? customStyles.navButtonActive : customStyles.navButton}
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                  history.replace('/birth/list');
                }}
                  onKeyDown
                  role="button"
                >
                  <Typography variant="title" color="inherit">
                      जन्म दर्ता विवरण
                  </Typography>
                </a>
              </div>
              <div className={customStyles.navItems}>
                <a
                  className={active === 2 ? customStyles.navButtonActive : customStyles.navButton}
                  type="button"
                  tabIndex={-1}
                  onKeyDown
                  role="button"
                  onClick={() => {
                  history.replace('/marriage/list');
                }}
                >
                  <Typography variant="title" color="inherit">
                    विवाह दर्ता विवरण
                  </Typography>
                </a>
              </div>
              <div className={customStyles.navItems}>
                <a
                  className={active === 3 ? customStyles.navButtonActive : customStyles.navButton}
                  type="button"
                  tabIndex={-1}
                  onKeyDown
                  role="button"
                  onClick={() => {
                  history.replace('/divorce/list');
                }}
                >
                  <Typography variant="title" color="inherit">
                    सम्बन्ध विच्छेद विवरण
                  </Typography>
                </a>
              </div>
              <div className={customStyles.navItems}>
                <a
                  className={active === 4 ? customStyles.navButtonActive : customStyles.navButton}
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                  history.replace('/migration/list');
                }}
                  onKeyDown
                  role="button"
                >
                  <Typography variant="title" color="inherit">
                      बसाई सराई विवरण
                  </Typography>
                </a>
              </div>
              <div className={customStyles.navItems}>
                <a
                  className={active === 5 ? customStyles.navButtonActive : customStyles.navButton}
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                history.replace('/death/list');
              }}
                  onKeyDown
                  role="button"
                >
                  <Typography variant="title" color="inherit">
                    मृत्यु दर्ता विवरण
                  </Typography>
                </a>
              </div>
              {props.auth === 'admin' ?
                <div className={customStyles.navItems}>
                  <a
                    className={active === 6 ? customStyles.navButtonActive : customStyles.navButton}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                history.replace('/settings');
              }}
                    onKeyDown
                    role="button"
                  >
                    <Typography variant="title" color="inherit">
                      सेटिङस्
                    </Typography>
                  </a>
                </div> : null}
            </div>
          </OutDiv>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,

};


const finalNav = connect((state) => (
  {
    auth: state.auth.role
  }
), null)(DenseAppBar);
export default withStyles(styles)(finalNav);
