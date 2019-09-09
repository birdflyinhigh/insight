import {combineReducers} from 'redux';
import index from './index';
import overview from './overview';
import rate from './rate';
import save from './save';
import manage from './manage';
import provider from './provider';
import urgent from './urgent';
import project from './project';
import examine from './examine';
export default combineReducers({
  index, overview, rate, save, manage, provider, urgent, project, examine
});