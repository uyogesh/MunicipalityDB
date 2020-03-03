import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import migrationReducer from './migrationReducer';
import birthReducer from './birthReducer';
import deathReducer from './deathReducer';
import marriageReducer from './marriageReducer';
import divorceReducer from './divorceReducer';

export default combineReducers({
  migration: migrationReducer,
  auth: loginReducer,
  form: formReducer,
  birth: birthReducer,
  death: deathReducer,
  marriage: marriageReducer,
  divorce: divorceReducer
});
