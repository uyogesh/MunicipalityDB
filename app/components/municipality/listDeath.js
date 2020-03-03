import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PageTitle from '..//modules/pageTitle';
import styles from './listAccount.css';
import { listAccountLoading } from '../../actions';
import { getDeath, chooseEntry, entryCancelled, deleteRecord } from '../../actionsnew/death';
import DeathEntry from './entries/death';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const HeaderBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  margin-right: 30px;

`;


class ListAccount extends Component {
  static propTypes = {
    accountList: PropTypes.shape(),
    getAllAccounts: PropTypes.func.isRequired,
    listAccountLoading: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    // latestAccounts: this.propTypes.shape.isRequired

  }
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      headerOptions: [
        { 'दर्ता न': undefined },
        { 'दर्ता मिति': undefined },
        { 'नाम थर': undefined },
        { 'मृत्यु भयेको मिति': undefined },
        { लिङ्ग: undefined },
        { 'बाबुको नाम': undefined },
        { 'बाजेको नाम': undefined },
        { कैफियत: undefined },
        { ' ': undefined }
      ],
      open: false,
      toDelete: null,
      search: '',
      currentChoice: 1,
      fields: [
        'दर्ता न',
        'दर्ता मिति',
        'नाम/ थर',
        'मृत्यु भयेको मिति',
        'उमेर',
        'लिङ्ग',
        'नागरिकता लियेको भये, जारि मिति र जिल्ला',
        'मृत्यु भयेको स्थान',
        'स्थायी ठेगाना',
        'अस्थाई ठेगाना',
        'बाजेको नाम',
        'बाबुको नाम',
        'पति/ पत्नीको नाम',
        'सुचक को नाम, ठेगाना, ना.प्र.प र जिल्ला ',
        'प्रमाण पत्र बुझेको मिति',
        'दर्ता गर्ने पन्झिकधिकारी को नाम',
        'कैफियत'

      ]
    };
  }
  componentWillMount() {
    // this.props.getAllAccounts(0);
    this.props.getDeath();
  }


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    if (this.state.search === '') {
      this.props.getDeath(null, pageNumber - 1);
    } else {
      this.props.getDeath(this.state.search, pageNumber - 1);
    }
    this.setState({ activePage: pageNumber });
  }
  hangleStateChange = (e) => {
    console.log(e.target.value);
    const val = e.target.value;
    this.setState({ filterstate: val });
    this.filterStateChoose(val);
  }

  filterStateChoose = (val) => {
    this.props.getAllAccounts(
      this.state.activePage - 1,
      val,
    );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.entryCancelled();
  };

  handleCloseDelete = () => {
    this.setState({
      toDelete: null
    });
  }

  handleDeleteSelect = () => {
    this.props.deleteRecord(this.state.toDelete._id.toString());
    this.setState({
      toDelete: null
    });
  }

  render() {
    const {
      death, history, classes, role
    } = this.props;
    console.log(this.state.currentChoice);
    if (death.isLoaded) {
      return (
        <div className={styles.container}>
          <Dialog
            open={(this.state.toDelete !== null)}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseDelete}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {'के यो दर्ता विवरण मेट्न चहानु हुन्छ ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <span className={styles.coloredText}>{ this.state.toDelete ? this.state.toDelete.personName : '' }</span>
                {' को मृत्यु दर्ता । '}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDeleteSelect} color="primary">
              हुन्छ
              </Button>
              <Button onClick={this.handleCloseDelete} color="secondary">
              हुन्न
              </Button>

            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen
            open={death.currentChoice}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Button color="inherit" onClick={this.handleClose}>
                  save
                </Button>
                <ReactToPrint
                  trigger={() =>
                    (<a
                      role="button"
                      tabIndex="0"
                    >
                    Print
                    </a>
                    )}
                  content={() => this.componentRef}
                />
              </Toolbar>
            </AppBar>
            {death.currentChoice ? <DeathEntry ref={el => (this.componentRef = el)} /> : null}
          </Dialog>
          <HeaderBar>
            <PageTitle for="मृत्यु दर्ता" />
            <SearchBox>
              <TextField
                id="search"
                label="खोज्नु होस"
                type="search"
                className={classes.textField}
                margin="normal"
                value={this.state.search}
                onChange={(text) => {
                this.setState({ search: text.target.value });
                this.props.getDeath(text.target.value);
              }}
              />
            </SearchBox>
          </HeaderBar>
          <div>
            <div className={styles.titleContainer}>
              <div className={styles.titleInner}>
                <span className={styles.titleMainUpper}>कुल दर्ता सङख्या</span>
                <span className={styles.titleSub}>{`[${death.numberOfPages}]`}</span>
              </div>
              <div className={styles.addAnotherContainer}>
                <a
                  className={styles.addAnotherText}
                  role="button"
                  tabIndex="0"
                  onKeyPress={() => {

                  }}
                  onClick={() => {
                    history.replace('/death/create');
                  }}
                  title="Add Person"
                >
                  <span>&#x2295;
                  </span>दर्ता थप्नुहोस
                </a>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.rowTitle}>
                {this.state.headerOptions.map((headerOption, index) => (
                  <div className={styles.rowElement}>
                    <span className={styles.titleMain}>{Object.keys(headerOption)[0]}</span>


                  </div>
                ))}
              </div>
              <div className="body-div">
                {death.list.map((value, index) =>
                (<div className={styles.rowList} key={`index${value.regNo}`}>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.regNo}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.regDate}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <a
                      className={styles.textBlue}
                      onClick={() => {
                            this.props.chooseEntry(value);
                            }}
                      onKeyPress
                      role="button"
                      tabIndex="0"
                    >{value.personName}
                    </a>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.dod}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.gender}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.dad}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.grandDad}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.misc}</p>
                  </div>
                  {role === 'admin' ? <div className={styles.rowElementList}>
                    <a
                      role="button"
                      onKeyDown
                      tabIndex={0}
                      onClick={() => {
                      this.setState({ toDelete: value });
                    }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#990000" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                    </a>
                  </div> : <div className={styles.rowElementList} /> }
                </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.paginationBox}>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={25}
              totalItemsCount={death.numberOfPages * 25}
              innerClass={styles.pagination}
              pageRangeDisplayed={(death.numberOfPages / 25) % 100 === 0 ?
                (death.numberOfPages / 25) : Math.ceil((death.numberOfPages / 25))}
              activeLinkClass={styles.activeLink}
              onChange={::this.handlePageChange}
              activeClass={styles.active}
              linkClass={styles.linkClass}
              hideFirstLastPages
              hideNavigation
            />
          </div>
        </div>
      );
    }
    return (
      <div>
          LOADING
      </div>
    );
  }
}
ListAccount.defaultProps = {
  accountList: []
};

const mapStateToProps = (state) => (
  {
    death: state.death,
    role: state.auth.role
  }
);

const compWithStyle = withStyles(styles)(ListAccount);
export default connect(mapStateToProps, {
  getDeath, listAccountLoading, entryCancelled, chooseEntry, deleteRecord
})(compWithStyle);
