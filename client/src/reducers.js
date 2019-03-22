import { combineReducers } from 'redux';
import itemsReducer from './app/ItemsList';
import productReducer from './app/Product';
import { createForms } from 'react-redux-form';
import { SEARCH_INITIAL_STATE } from './app/Header/Search';

// Uno todos los reducers en uno raiz. 
const rootReducer = combineReducers({
	items: itemsReducer,
	product: productReducer,
	// Reducer generado con react-redux-form
	...createForms({
		search: SEARCH_INITIAL_STATE
	})
});

export default rootReducer;