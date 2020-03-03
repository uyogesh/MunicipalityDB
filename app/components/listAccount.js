import React, { Component } from 'react';
// import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageTitle from './modules/pageTitle';
import store from '../index';
import styles from './listAccount.css';
import { getAllAccounts, listAccountLoading } from '../actions';
import {getMigrations} from '../actionsnew/migration';

class ListAccount extends Component {
  static propTypes ={
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
        { 'Account Name': undefined },
        { 'State ': 'filter' },
        { 'Created On': undefined },
        { 'Providers Count': 'filter' },
        { 'Account Owner': 'filter' }
      ],
      filterstate: '',
      states: [
        '',
        'PM',
        'SV'
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
  componentDidMount() {
    this.props.getAllAccounts(0);
  }


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.props.listAccountLoading();
    this.props.getAllAccounts(
      this.state.activePage - 1,
      this.state.filterstate,
    );
  }

  sortOrder(value) {
    console.log(value);
    this.setState({ });
    switch (value) {
      case 'name':
        this.setState({ nameasc: !this.state.nameasc });
        if (this.state.nameasc === true) {
          this.setState({ sortDir: 'asc' });
        } else {
          this.setState({ sortDir: 'desc' });
        }
        this.props.getAllAccounts(this.state.activePage - 1, 'name', this.state.sortDIr);
        break;
      case 'state':
        this.setState({ stateasc: !this.state.stateasc });
        this.props.getAllAccounts(
          this.state.activePage - 1,
          this.filterstate, this.state.nameasc
        );
        break;
      case 'created':
        this.setState({ createdasc: !this.state.createdasc });
        this.props.getAllAccounts(
          this.state.activePage - 1,
          this.filterstate, this.state.nameasc
        );
        break;
      case 'numberOfProviders':
        this.setState({ numberOfProvidersasc: !this.state.numberOfProvidersasc });
        this.props.getAllAccounts(
          this.state.activePage - 1,
          this.filterstate, this.state.nameasc
        );
        break;
      case 'owner':
        this.setState({ ownerasc: !this.state.ownerasc });
        this.props.getAllAccounts(
          this.state.activePage - 1,
          this.filterstate, this.state.nameasc
        );
        break;
      default:
    }
    console.log(this.state);
  }
  getFilterOptions(key) {
    switch (key) {
      case 1:
        return this.props.accountList.headerKeys.state.map((option) =>
          (
            <option
              value={option}
              title={option}
              className={styles.input}
            > {option}
            </option>
          ));
      case 4:
        return this.props.accountList.headerKeys.owner.map((option) =>
          (
            <option
              value={option}
              title={option}
              className={styles.input}
            > {option}
            </option>
          ));
      case 3:
        return this.props.accountList.headerKeys.provider.map((option) =>
          (
            <option
              value={option}
              title={option}
              className={styles.input}
            > {option}
            </option>
          ));
      default:
        return '';
    }
  }
  hangleStateChange=(e) => {
    console.log(e.target.value);
    const val = e.target.value;
    this.setState({ filterstate: val });
    this.filterStateChoose(val);
  }

  filterStateChoose=(val) => {
    this.props.getAllAccounts(
      this.state.activePage - 1,
      val,
    );
  }
  // filterOwnerChoose=(e) => {
  //   console.log(e.target.value);
  //   this.setState({ filterowner: e.target.value });
  //   // console.log(this.state.filterstate);
  //   this.props.getAllAccounts(
  //     this.state.activePage - 1,
  //     this.state.filterstate,
  //     this.state.filterowner,
  //   );
  // }

  render() {
   
    if (this.props.migration.isLoaded) {
      const { data } = this.props.migration;
      return (
        <div className={styles.container}>
          <button
            className={styles.backButton}
            data-tid="backButton"
          >
            <Link to="/">
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
          </button>
          <PageTitle for="Accounts" />
          <div>
            <div className={styles.titleContainer}>
              <div className={styles.titleInner}>
                <span className={styles.titleMainUpper}>Active Account</span>
                <span className={styles.titleSub}>{`[${latestAccounts.numberOfPages}]`}</span>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.rowTitle}>
                {this.state.headerOptions.map((headerOption, index) => (
                  <div className={styles.rowElement}>
                    <span className={styles.titleMain}>{Object.keys(headerOption)[0]}</span>
                    <div className={styles.arrowFlex}>
                      <div
                        className={styles.arrowUp}
                        onClick={() => { this.sortOrder('name'); }}
                        name={Object.keys(headerOption)[0]}
                        onKeyPress
                        role="button"
                        tabIndex="0"
                      />
                      <div
                        className={styles.arrowDown}
                        onClick={() => { this.sortOrder('name'); }}
                        name={Object.keys(headerOption)[0]}
                        value="dsc"
                        onKeyPress
                        role="button"
                        tabIndex="0"
                      />
                    </div>
                    {headerOption[Object.keys(headerOption)[0]] ?
                      <select
                        name="select"
                        onChange={() => {
                    }}
                      >
                        {this.getFilterOptions(index)}
                      </select> : undefined}
                  </div>
                  ))}
              </div>

              <div>
                {latestAccounts.accountList.map((value) => (
                  <div className={styles.rowList}>
                    <div className={styles.rowElementList}>
                      <a
                        className={styles.textBlue}
                        onClick={() => {
                            this.props.history.push({
                            pathname: '/editAccount',
                            state: { id: value.id }
                            });
                            }}
                        onKeyPress
                        role="button"
                        tabIndex="0"
                      >{value.name}
                      </a>
                    </div>
                    <div className={styles.rowElementList}>
                      <p className={styles.textNormal}>{value.state}</p>
                    </div>
                    <div className={styles.rowElementList}>
                      <p className={styles.textNormal}>{value.created.split('T')[0]}</p>
                    </div>
                    <div className={styles.rowElementList}>
                      <p className={styles.textNormal}>{value.numberOfProviders}</p>
                    </div>
                    <div className={styles.rowElementList}>
                      <p className={styles.textNormal}>{value.owner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.paginationBox}>
            {/* <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={25}
              totalItemsCount={latestAccounts.numberOfPages}
              innerClass={styles.pagination}
              pageRangeDisplayed={(latestAccounts.numberOfPages / 25) + 1}
              activeLinkClass={styles.activeLink}
              onChange={::this.handlePageChange}
              activeClass={styles.active}
              linkClass={styles.linkClass}
              hideFirstLastPages
              hideNavigation
            /> */}
          </div>
        </div>
      );
    }
    return (
      <div>
        <span>LOADING</span>
      </div>
    );
  }
}
ListAccount.defaultProps = {
  accountList: []
};

const mapStateToProps = (state) => (
  { migration: state.migration }
);


export default connect(mapStateToProps, { getMigrations, listAccountLoading })(ListAccount);
