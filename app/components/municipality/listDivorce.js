import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import ReactToPrint from 'react-to-print';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import styles from './listAccount.css';
import PageTitle from '..//modules/pageTitle';
import { listAccountLoading } from '../../actions';
import { getDivorce, chooseEntry, entryCancelled, deleteRecord } from '../../actionsnew/divorce';
import DivorceEntry from './entries/divorce';

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

class ListDivorce extends Component {
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
        { 'पतिको नाम थर': undefined },
        { 'पत्नीको नाम थर': undefined },
        { 'सम्बन्ध विछेद ठहर गर्ने अदालतको नाम र निर्णय मिति': undefined },
        { कैफियत: undefined },
        { '': undefined }
      ],
      open: false,
      currentChoice: 1,
      search: '',
      toDelete: null,
      fields: [
        'दर्ता न',
        'दर्ता मिति',
        'सम्बन्ध विछेद ठहर गर्ने अदालतको नाम र निर्णय मिति',
        'विवाह स्थान',
        'दुलाहाको नाम',
        'जन्म मिति',
        'बाजेको नाम',
        'बाबुको नाम',
        'जन्म स्थान',
        'ठेगाना',
        'नागरिकता लियेको भये, जारि मिति र जिल्ला',
        'दुलहीको नाम',
        'जन्म मिति',
        'बाजेको नाम',
        'बाबुको नाम',
        'जन्म स्थान',
        'ठेगाना',
        'नागरिकता लियेको भये, जारि मिति र जिल्ला',
        'सुचक को नाम',
        'प्रमाण पत्र बुझ्को मिति',
        'दर्ता गर्ने पन्झिकधिकारी को नाम',
        'कैफियत'],
      filterstate: '',
      states: [

      ],
      owners: [
        '',
        'owner1',
        'owner2',
        'owner3',
        'Daisy Duck'
      ],
      numberProviders: [
        '',
        '1',
        '2',
      ],
      nameasc: true,
      stateasc: false,
      createdasc: false,
      numberOfProvidersasc: false,
      ownerasc: false,
      sortDIr: 'asc',

    };
  }
  componentWillMount() {
    // this.props.getAllAccounts(0);
    this.props.getDivorce();
  }


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    if (this.state.search === '') {
      this.props.getDivorce(null, pageNumber - 1);
    } else {
      this.props.getDivorce(this.state.search, pageNumber - 1);
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
      divorce, history, classes, role
    } = this.props;
    console.log(this.state.currentChoice);
    if (divorce.isLoaded) {
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

                { this.state.toDelete ? this.state.toDelete.groomName : '' }
                {' को र '}
                { this.state.toDelete ? this.state.toDelete.brideName : '' }
                {' को सम्बन्ध विच्छेद दर्ता । '}
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
            open={divorce.currentChoice}
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
            {divorce.currentChoice ? <DivorceEntry ref={el => (this.componentRef = el)} /> : null}
          </Dialog>
          <HeaderBar>
            <PageTitle for="सम्बन्ध विच्छेद" />
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
                this.props.getDivorce(text.target.value);
              }}
              />
            </SearchBox>
          </HeaderBar>
          <div>
            <div className={styles.titleContainer}>
              <div className={styles.titleInner}>
                <span className={styles.titleMainUpper}>कुल दर्ता सङख्या</span>
                <span className={styles.titleSub}>{`[${divorce.numberOfPages}]`}</span>
              </div>
              <div className={styles.addAnotherContainer}>
                <a
                  className={styles.addAnotherText}
                  role="button"
                  tabIndex="0"
                  onKeyPress={() => {

                  }}
                  onClick={() => {
                    history.replace('/divorce/create');
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
                {divorce.list.map((value, index) =>
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
                            // this.props.history.push({
                            // pathname: '/editAccount',
                            // state: { id: value.id }
                            // });
                            // console.log(index);
                            this.props.chooseEntry(value);
                            // this.setState({ currentChoice: index }, () => {
                            //   this.setState({ open: true });
                            // });
                            }}
                      onKeyPress
                      role="button"
                      tabIndex="0"
                    >{value.groomName}
                    </a>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.brideName}</p>
                  </div>
                  <div className={styles.rowElementList}>
                    <p className={styles.textNormal}>{value.descisionDate}</p>
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
              totalItemsCount={divorce.numberOfPages * 25}
              innerClass={styles.pagination}
              pageRangeDisplayed={(divorce.numberOfPages / 25) % 100 === 0 ?
                (divorce.numberOfPages / 25) : Math.ceil((divorce.numberOfPages / 25))}
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
ListDivorce.defaultProps = {
  accountList: []
};

const mapStateToProps = (state) => (
  {
    divorce: state.divorce,
    role: state.auth.role
  }
);

const compWithStyle = withStyles(styles)(ListDivorce);
export default connect(mapStateToProps, {
  getDivorce, listAccountLoading, chooseEntry, entryCancelled, deleteRecord
})(compWithStyle);
