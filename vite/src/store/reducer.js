import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { apiSlice } from '../api/apiSlice';


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export default reducer;
