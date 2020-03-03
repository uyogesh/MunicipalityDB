import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PageTitle from '..//modules/pageTitle';
import styles from './listAccount.css';
import { listAccountLoading } from '../../actions';
import { getMigrations, entryCancelled, chooseEntry, deleteRecord } from '../../actionsnew/migration';
import MigrationEntry from './entries/migration';

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
        { 'बसाई सरै गर्ने ब्यक्ती वा परिवारको नाम थर': undefined },
        { 'सुचक सँग को नाता': undefined },
        { लिङ्ग: undefined },
        { 'बसाइ सरी जाने स्थान': undefined },
        { 'बसाइ सरी आएको स्थान': undefined },
        { कैफियत: undefined },
        { '': undefined }
      ],
      currentChoice: 1,
      search: '',
      toDelete: null

    };
  }
  componentWillMount() {
    // this.props.getAllAccounts(0);
    this.props.getMigrations();
  }


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    if (this.state.search === '') {
      this.props.getMigrations(null, pageNumber - 1);
    } else {
      this.props.getMigrations(this.state.search, pageNumber - 1);
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

  handleClickOpen = (index) => {
    // this.setState({ open: true });
    this.props.chooseEntry(index);
  };

  handleClose = () => {
    // this.setState({ open: false });
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
      migration, history, classes, role
    } = this.props;
    console.log(this.state.currentChoice);
    if (migration.isLoaded) {
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
                {console.log(this.state)}
                { this.state.toDelete ? this.state.toDelete.individual[0].migratorName : '' }
                {' को बसाई सराई दर्ता । '}
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
            open={migration.currentChoice}
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
            {migration.currentChoice ? <MigrationEntry ref={el => (this.componentRef = el)} /> : null}
          </Dialog>
          <HeaderBar>
            <PageTitle for="बसाई सराई" />
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
                this.props.getMigrations(text.target.value);
              }}
              />
            </SearchBox>
          </HeaderBar>
          <div>
            <div className={styles.titleContainer}>
              <div className={styles.titleInner}>
                <span className={styles.titleMainUpper}>कुल दर्ता सङख्या</span>
                <span className={styles.titleSub}>{`[${migration.numberOfPages}]`}</span>
              </div>
              <div className={styles.addAnotherContainer}>
                <a
                  className={styles.addAnotherText}
                  role="button"
                  tabIndex="0"
                  onKeyPress={() => {

                  }}
                  onClick={() => {
                    history.replace('/migration/create');
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
                {migration.list.map((value, index) =>
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
                    >{value.individual[0].migratorName}
                    </a>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.individual[0].relationWithInformer}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.individual[0].gender}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.individual[0].outDestLocation}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.individual[0].inDestLocation}</p>
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
              totalItemsCount={migration.numberOfPages * 25}
              innerClass={styles.pagination}
              pageRangeDisplayed={(migration.numberOfPages / 25) % 100 === 0 ?
                (migration.numberOfPages / 25) : Math.ceil((migration.numberOfPages / 25))}
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
    migration: state.migration,
    role: state.auth.role
  }
);

const compWithStyle = withStyles(styles)(ListAccount);
export default connect(mapStateToProps, {
  getMigrations, listAccountLoading, entryCancelled, chooseEntry, deleteRecord
})(compWithStyle);
