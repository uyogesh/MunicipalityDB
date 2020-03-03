import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import loginReducer from './loginReducer';
import AccountListReducer from './AccountListReducer';
import EditAccountReducer from './EditAccountReducer';


const rootReducer = combineReducers({

  counter,
  auth: loginReducer,
  form: formReducer,
  accounts: AccountListReducer,
  accountdetail: EditAccountReducer,
});

export default rootReducer;
