import {combineReducers} from 'redux';
import authReducer from './authReducer';
import {reducer as reduxForm} from 'redux-form';
import surveyReducers from './surveyReducers';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveyReducers
})