import React from 'react';
import { Router, Switch, Route } from 'react-router';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import requireAuth from './components/RequireAuth';
import noRequireAuth from './components/NoRequireAuth';
import Signout from './components/SignOut';
import { history } from './store/configureStore';
import CreateAccountPage from './containers/CreateAccountPage';
import AccountListPage from './containers/AccountListPage';
import EditAccountPage from './containers/EditAccountPage';
import HomePage from './containers/Dashboard';
import Settings from './containers/Settings';
// import mongoose from './db/index';
// Migration imports
import CreateMigration from './containers/createMigration';
import ListMigration from './containers/listMigration';
import CreateBirth from './containers/CreateBirth';
import ListBirth from './containers/listBirth';
import CreateDeath from './containers/createDeath';
import ListDeath from './containers/ListDeath';
import CreateMarriage from './containers/CreateMarriage';
import ListMarriage from './containers/ListMarriage';
import ListDivorce from './containers/ListDivorce';
import CreateDivorce from './containers/CreateDivorce';

export default () => (


  <App>

    <Router history={history} >
      <Switch>
        {/* <Route path="/login" component={noRequireAuth(LoginPage)} />
        <Route path="/createAccount" component={requireAuth(CreateAccountPage)} />
        <Route path="/editAccount" component={requireAuth(EditAccountPage)} />
        <Route path="/counter" component={requireAuth(CounterPage)} />
        <Route path="/accountlist" component={requireAuth(AccountListPage)} />
        <Route path="/signout" component={requireAuth(Signout)} />
        <Route path="/" component={CreateAccountPage} /> */}
        <Route path="/login" component={noRequireAuth(LoginPage)} />
        <Route path="/dashboard" component={requireAuth(HomePage)} />
        <Route path="/migration/create" component={requireAuth(CreateMigration)} />
        <Route path="/migration/list" component={requireAuth(ListMigration)} />
        <Route path="/birth/create" component={requireAuth(CreateBirth)} />
        <Route path="/birth/list" component={requireAuth(ListBirth)} />
        <Route path="/death/create" component={requireAuth(CreateDeath)} />
        <Route path="/death/list" component={requireAuth(ListDeath)} />
        <Route path="/marriage/create" component={requireAuth(CreateMarriage)} />
        <Route path="/marriage/list" component={requireAuth(ListMarriage)} />
        <Route path="/divorce/list" component={requireAuth(ListDivorce)} />
        <Route path="/divorce/create" component={requireAuth(CreateDivorce)} />
        <Route path="/settings" component={requireAuth(Settings)} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>

  </App>
);
